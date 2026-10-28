# Totem de autoatendimento — Drogaria São Paulo

Totem estilo McDonald's/BK para farmácia: o cliente toca no desenho do produto, monta o pedido, paga e recebe uma senha. Sem build, só HTML/CSS/JS + Supabase.

| Página | Para quê |
|---|---|
| `index.html` | **Totem** (tela do cliente, em tela cheia na vertical) |
| `painel.html` | **Painel da loja**: pedidos, chamados ao farmacêutico, produtos e estoque |
| `retirada.html` | **TV de retirada**: senhas em preparo / prontas, com aviso por voz |

## 1. Rodar agora (modo demonstração)
```bash
python3 -m http.server 8000      # ou: npx serve
```
Abra `http://localhost:8000` (totem), `/painel.html` (PIN **1234**) e `/retirada.html` em outra aba. Sem Supabase, tudo fica no navegador e as abas conversam entre si.

## 2. Supabase
1. Crie um projeto em supabase.com.
2. **SQL Editor** → cole `supabase/schema.sql` → Run.
3. **Authentication → Providers → Email**: desative *Allow new users to sign up*. Depois, em **Users → Add user**, crie o e-mail/senha do gerente (é o login do painel).
4. **Project Settings → API**: copie a *Project URL* e a chave **anon public**.
5. Cole os dois em `config.js` (`SUPABASE_URL`, `SUPABASE_ANON_KEY`).
6. Abra `painel.html`, entre e, em **Produtos**, clique em *Carregar catálogo de exemplo*.

## 3. GitHub
```bash
git init && git add . && git commit -m "Totem Drogaria"
git branch -M main
git remote add origin https://github.com/dhyegok/totem-drogaria.git
git push -u origin main
```

## 4. Vercel
*Add New → Project* → importe o repositório → **Framework Preset: Other** (sem build, sem output directory) → Deploy.

## 5. Usar de verdade na loja
- Totem em tela cheia: `chrome --kiosk https://SEU-SITE.vercel.app`
- TV da retirada: abra `/retirada.html` e toque em *Ativar aviso por voz* (o navegador exige um toque).
- Impressora: o botão *Imprimir senha* usa a impressão do navegador (cupom de 72 mm).

## Antes de apresentar como produto final
- **Pagamento é simulado** (`demoPayment` em `config.js`). Para cobrar de verdade, integre maquininha/TEF ou PSP (Pix e cartão) e só crie o pedido após a confirmação.
- **Preços vêm do navegador.** Para produção, valide o total no servidor (Supabase Edge Function ou RPC) antes de gravar o pedido.
- **Leitura pública de pedidos**: não há dados pessoais, mas qualquer pessoa com a chave anon lê as senhas. Se quiser restringir, exponha só número/status numa view.
- **Regras de farmácia**: o catálogo traz só itens de livre venda e marca os MIP para orientação do farmacêutico. Confirme com o farmacêutico responsável e o jurídico da empresa o que pode ser vendido por autoatendimento. Medicamentos controlados e com receita ficam fora.
- Preços e produtos do catálogo são fictícios. Troque pelo cadastro real no painel.

## Logo e cores
As cores seguem o site da Drogaria São Paulo (azul-petróleo, vermelho, azul-claro, verde-limão) e ficam nas variáveis `:root` de cada página.
Para colocar a logo, salve o arquivo oficial em `logo.png` (fundo transparente ou branco, formato horizontal). Ele aparece sozinho no topo do totem, na abertura, no painel e na TV. Sem o arquivo, aparece o nome da loja em texto.
