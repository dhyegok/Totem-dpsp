// Camada de dados compartilhada (totem, painel e tela de retirada).
// Com Supabase configurado usa o banco; sem ele, roda em modo demonstração (localStorage).
(function () {
  const C = window.TOTEM_CONFIG;
  const usaSupabase = !!(C.SUPABASE_URL && C.SUPABASE_ANON_KEY && window.supabase);
  const sb = usaSupabase ? window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_ANON_KEY) : null;

  const K = { produtos: "totem_produtos", pedidos: "totem_pedidos", chamados: "totem_chamados", contador: "totem_contador", pin: "totem_painel_ok" };
  const canal = "BroadcastChannel" in window ? new BroadcastChannel("totem-drogaria") : null;
  const ouvintes = new Set();

  const ler = (k, padrao) => { try { return JSON.parse(localStorage.getItem(k)) ?? padrao; } catch (e) { return padrao; } };
  const gravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { throw new Error("Sem espaço no navegador. Use fotos menores ou configure o Supabase."); } };
  const avisar = () => { ouvintes.forEach(fn => { try { fn(); } catch (e) { console.error(e); } }); };
  const notificarOutrasAbas = () => { if (canal) canal.postMessage("mudou"); };
  if (canal) canal.onmessage = avisar;
  window.addEventListener("storage", e => { if (e.key && e.key.startsWith("totem_")) avisar(); });

  const inicioDoDia = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d.toISOString(); };
  const falha = (error) => { if (error) { console.error(error); throw new Error(error.message || "Erro ao acessar o banco"); } };

  const Totem = {
    modo: usaSupabase ? "supabase" : "demo",
    config: C,

    // ---------- Produtos ----------
    async getProdutos() {
      if (sb) {
        const { data, error } = await sb.from("produtos").select("*").order("nome");
        falha(error); return data;
      }
      let p = ler(K.produtos, null);
      if (!p) { p = JSON.parse(JSON.stringify(window.CATALOGO)); gravar(K.produtos, p); }
      return p;
    },
    async salvarProduto(prod) {
      if (sb) {
        const { error } = await sb.from("produtos").upsert(prod);
        falha(error); return;
      }
      const lista = await this.getProdutos();
      const i = lista.findIndex(x => x.id === prod.id);
      if (i >= 0) lista[i] = { ...lista[i], ...prod }; else lista.push(prod);
      gravar(K.produtos, lista); notificarOutrasAbas(); avisar();
    },
    async carregarCatalogoDemo() {
      if (sb) {
        const { error } = await sb.from("produtos").upsert(window.CATALOGO);
        falha(error); return;
      }
      const antigos = ler(K.produtos, []);
      gravar(K.produtos, JSON.parse(JSON.stringify(window.CATALOGO)).map(p => { const a = antigos.find(x => x.id === p.id); return a && a.imagem ? { ...p, imagem: a.imagem } : p; }));
      notificarOutrasAbas(); avisar();
    },

    // ---------- Pedidos ----------
    async criarPedido({ itens, total, pagamento, precisaFarmaceutico }) {
      const base = { itens, total, pagamento, precisa_farmaceutico: !!precisaFarmaceutico, status: "novo" };
      if (sb) {
        const { data, error } = await sb.from("pedidos").insert(base).select().single();
        falha(error); return data;
      }
      const numero = (ler(K.contador, 0) + 1);
      gravar(K.contador, numero);
      const pedido = { id: "p" + Date.now(), numero, criado_em: new Date().toISOString(), ...base };
      const lista = ler(K.pedidos, []); lista.push(pedido); gravar(K.pedidos, lista);
      // baixa de estoque no modo demo
      const prods = await this.getProdutos();
      itens.forEach(it => { const p = prods.find(x => x.id === it.id); if (p) p.estoque = Math.max(0, (p.estoque || 0) - it.qtd); });
      gravar(K.produtos, prods);
      notificarOutrasAbas(); avisar();
      return pedido;
    },
    async listarPedidos() {
      if (sb) {
        const { data, error } = await sb.from("pedidos").select("*").gte("criado_em", inicioDoDia()).order("criado_em", { ascending: true });
        falha(error); return data;
      }
      return ler(K.pedidos, []).filter(p => p.criado_em >= inicioDoDia());
    },
    async mudarStatusPedido(id, status) {
      if (sb) {
        const { error } = await sb.from("pedidos").update({ status }).eq("id", id);
        falha(error); return;
      }
      const lista = ler(K.pedidos, []);
      const p = lista.find(x => x.id === id); if (p) p.status = status;
      gravar(K.pedidos, lista); notificarOutrasAbas(); avisar();
    },

    // ---------- Chamados ao farmacêutico ----------
    async criarChamado(motivo) {
      if (sb) {
        const { error } = await sb.from("chamados").insert({ motivo, status: "aberto" });
        falha(error); return;
      }
      const lista = ler(K.chamados, []);
      lista.push({ id: "c" + Date.now(), motivo, status: "aberto", criado_em: new Date().toISOString() });
      gravar(K.chamados, lista); notificarOutrasAbas(); avisar();
    },
    async listarChamados() {
      if (sb) {
        const { data, error } = await sb.from("chamados").select("*").gte("criado_em", inicioDoDia()).order("criado_em", { ascending: false });
        falha(error); return data;
      }
      return ler(K.chamados, []).filter(c => c.criado_em >= inicioDoDia()).reverse();
    },
    async mudarStatusChamado(id, status) {
      if (sb) {
        const { error } = await sb.from("chamados").update({ status }).eq("id", id);
        falha(error); return;
      }
      const lista = ler(K.chamados, []);
      const c = lista.find(x => x.id === id); if (c) c.status = status;
      gravar(K.chamados, lista); notificarOutrasAbas(); avisar();
    },

    // ---------- Atualização em tempo real ----------
    aoMudar(fn) {
      ouvintes.add(fn);
      if (sb && !this._canalRealtime) {
        this._canalRealtime = sb.channel("totem-mudancas")
          .on("postgres_changes", { event: "*", schema: "public", table: "pedidos" }, avisar)
          .on("postgres_changes", { event: "*", schema: "public", table: "chamados" }, avisar)
          .on("postgres_changes", { event: "*", schema: "public", table: "produtos" }, avisar)
          .subscribe();
      }
      if (!this._poll) this._poll = setInterval(avisar, sb ? 60000 : 8000); // rede de segurança (com Supabase o tempo real já avisa)
      return () => ouvintes.delete(fn);
    },

    // ---------- Acesso ao painel ----------
    async sessaoPainel() {
      if (sb) { const { data } = await sb.auth.getSession(); return !!data.session; }
      return sessionStorage.getItem(K.pin) === "1";
    },
    async entrarPainel(credencial, senha) {
      if (sb) {
        const { error } = await sb.auth.signInWithPassword({ email: credencial, password: senha });
        if (error) throw new Error("E-mail ou senha incorretos.");
        return;
      }
      if (credencial !== C.painelPinDemo) throw new Error("PIN incorreto.");
      sessionStorage.setItem(K.pin, "1");
    },
    async sairPainel() {
      if (sb) await sb.auth.signOut();
      sessionStorage.removeItem(K.pin);
    }
  };

  // ---------- Utilidades ----------
  Totem.brl = v => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  Totem.senha = n => String(n % 1000).padStart(3, "0");
  Totem.esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  window.Totem = Totem;
})();
