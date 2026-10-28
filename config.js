// Configuração do totem. Edite aqui — nenhum outro arquivo precisa mudar.
window.TOTEM_CONFIG = {
  loja: "Drogaria São Paulo",
  unidade: "Unidade demonstração",

  // Supabase (deixe vazio para rodar em modo demonstração, só no navegador)
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: "",

  // Tempos (segundos)
  idleSeconds: 45,          // sem toque no menu -> pergunta "ainda está aí?"
  idleWarnSeconds: 10,      // contagem do aviso antes de voltar ao início
  resetAfterOrderSeconds: 25,

  // Pagamento simulado até integrar uma maquininha/PSP (ver README)
  demoPayment: true,

  // PIN do painel no modo demonstração (no Supabase vale o login por e-mail)
  painelPinDemo: "1234"
};
