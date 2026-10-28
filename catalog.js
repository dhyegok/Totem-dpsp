// Catálogo de demonstração (preços fictícios). Em produção, os produtos vêm do Supabase.
// mip = medicamento isento de prescrição: exige orientação do farmacêutico na retirada.
window.CATEGORIAS = [
  { id: "destaques",   nome: "Mais pedidos",       emoji: "⭐", cor: "#FFE9A8" },
  { id: "dor",         nome: "Dor e febre",        emoji: "💊", cor: "#FFD6D6" },
  { id: "gripe",       nome: "Gripe e alergia",    emoji: "🤧", cor: "#D9ECFF" },
  { id: "vitaminas",   nome: "Vitaminas",          emoji: "🍊", cor: "#FFE2BF" },
  { id: "higiene",     nome: "Higiene",            emoji: "🧼", cor: "#D5F3EC" },
  { id: "dermo",       nome: "Pele e sol",         emoji: "🧴", cor: "#F1DEFF" },
  { id: "bebe",        nome: "Mãe e bebê",         emoji: "🍼", cor: "#FFDCEB" },
  { id: "primeiros",   nome: "Primeiros socorros", emoji: "🩹", cor: "#DCEBDD" },
  { id: "conveniencia",nome: "Conveniência",       emoji: "🥤", cor: "#E4E8FF" }
];

window.CATALOGO = [
  // Dor e febre
  { id:"dipirona-1g",     nome:"Dipirona 1 g",                 descricao:"10 comprimidos. Analgésico e antitérmico.",           categoria:"dor", preco:12.90, emoji:"💊", mip:true,  estoque:40, ativo:true, destaque:true },
  { id:"paracetamol-750", nome:"Paracetamol 750 mg",           descricao:"20 comprimidos. Dor e febre.",                        categoria:"dor", preco:14.50, emoji:"💊", mip:true,  estoque:40, ativo:true, destaque:true },
  { id:"ibuprofeno-400",  nome:"Ibuprofeno 400 mg",            descricao:"10 cápsulas. Dor e inflamação.",                      categoria:"dor", preco:18.90, emoji:"🟠", mip:true,  estoque:30, ativo:true, destaque:false },
  { id:"gel-muscular",    nome:"Gel para dor muscular",        descricao:"Bisnaga de 60 g. Uso externo.",                       categoria:"dor", preco:21.90, emoji:"🧊", mip:true,  estoque:25, ativo:true, destaque:false },
  { id:"bolsa-termica",   nome:"Bolsa térmica gel",            descricao:"Quente ou fria. Reutilizável.",                       categoria:"dor", preco:24.90, emoji:"🧣", mip:false, estoque:15, ativo:true, destaque:false },

  // Gripe e alergia
  { id:"antigripal",      nome:"Antigripal",                   descricao:"6 comprimidos. Alívio dos sintomas da gripe.",        categoria:"gripe", preco:16.80, emoji:"🤒", mip:true,  estoque:35, ativo:true, destaque:true },
  { id:"antialergico",    nome:"Antialérgico 10 mg",           descricao:"12 comprimidos. Alergias e coceira.",                 categoria:"gripe", preco:19.90, emoji:"🌼", mip:true,  estoque:30, ativo:true, destaque:false },
  { id:"soro-nasal",      nome:"Soro nasal spray",             descricao:"Frasco de 50 ml. Limpa e hidrata o nariz.",           categoria:"gripe", preco:11.50, emoji:"👃", mip:false, estoque:50, ativo:true, destaque:false },
  { id:"pastilha-garganta",nome:"Pastilhas para garganta",     descricao:"12 pastilhas sabor mel e limão.",                     categoria:"gripe", preco:9.90,  emoji:"🍯", mip:true,  estoque:60, ativo:true, destaque:true },
  { id:"xarope-tosse",    nome:"Xarope para tosse",            descricao:"Frasco de 120 ml.",                                   categoria:"gripe", preco:22.50, emoji:"🥄", mip:true,  estoque:20, ativo:true, destaque:false },

  // Vitaminas
  { id:"vit-c",           nome:"Vitamina C efervescente",      descricao:"10 comprimidos sabor laranja.",                       categoria:"vitaminas", preco:15.90, emoji:"🍊", mip:false, estoque:45, ativo:true, destaque:true },
  { id:"vit-d",           nome:"Vitamina D 2000 UI",           descricao:"60 cápsulas.",                                        categoria:"vitaminas", preco:39.90, emoji:"☀️", mip:false, estoque:30, ativo:true, destaque:false },
  { id:"polivitaminico",  nome:"Polivitamínico A–Z",           descricao:"60 comprimidos.",                                     categoria:"vitaminas", preco:34.90, emoji:"🌈", mip:false, estoque:30, ativo:true, destaque:false },
  { id:"omega-3",         nome:"Ômega 3",                      descricao:"60 cápsulas.",                                        categoria:"vitaminas", preco:44.90, emoji:"🐟", mip:false, estoque:25, ativo:true, destaque:false },
  { id:"magnesio",        nome:"Magnésio",                     descricao:"60 cápsulas.",                                        categoria:"vitaminas", preco:29.90, emoji:"⚡", mip:false, estoque:25, ativo:true, destaque:false },
  { id:"colageno",        nome:"Colágeno em pó",               descricao:"Pote de 200 g sabor limão.",                          categoria:"vitaminas", preco:49.90, emoji:"🍋", mip:false, estoque:18, ativo:true, destaque:false },

  // Higiene
  { id:"sabonete",        nome:"Sabonete em barra",            descricao:"Pacote com 4 unidades.",                              categoria:"higiene", preco:8.90,  emoji:"🧼", mip:false, estoque:60, ativo:true, destaque:false },
  { id:"shampoo",         nome:"Shampoo hidratação",           descricao:"Frasco de 350 ml.",                                   categoria:"higiene", preco:17.90, emoji:"🧴", mip:false, estoque:40, ativo:true, destaque:false },
  { id:"creme-dental",    nome:"Creme dental",                 descricao:"Tubo de 90 g. Proteção total.",                       categoria:"higiene", preco:6.90,  emoji:"🪥", mip:false, estoque:80, ativo:true, destaque:true },
  { id:"escova-dental",   nome:"Escova de dentes",             descricao:"Cerdas macias. Leve 2, pague 1.",                     categoria:"higiene", preco:9.90,  emoji:"🪥", mip:false, estoque:50, ativo:true, destaque:false },
  { id:"desodorante",     nome:"Desodorante aerossol",         descricao:"150 ml. 48 horas de proteção.",                       categoria:"higiene", preco:13.90, emoji:"💨", mip:false, estoque:45, ativo:true, destaque:false },
  { id:"absorvente",      nome:"Absorvente com abas",          descricao:"Pacote com 16 unidades.",                             categoria:"higiene", preco:7.50,  emoji:"🌸", mip:false, estoque:60, ativo:true, destaque:false },
  { id:"alcool-gel",      nome:"Álcool em gel 70%",            descricao:"Frasco de 500 ml.",                                   categoria:"higiene", preco:10.90, emoji:"🫧", mip:false, estoque:50, ativo:true, destaque:false },
  { id:"fio-dental",      nome:"Fio dental",                   descricao:"50 metros, menta.",                                   categoria:"higiene", preco:5.90,  emoji:"🦷", mip:false, estoque:70, ativo:true, destaque:false },

  // Pele e sol
  { id:"fps50",           nome:"Protetor solar FPS 50",        descricao:"Frasco de 200 ml. Resistente à água.",                categoria:"dermo", preco:42.90, emoji:"🏖️", mip:false, estoque:30, ativo:true, destaque:true },
  { id:"hidratante",      nome:"Hidratante corporal",          descricao:"Frasco de 400 ml.",                                   categoria:"dermo", preco:19.90, emoji:"💧", mip:false, estoque:35, ativo:true, destaque:false },
  { id:"repelente",       nome:"Repelente de insetos",         descricao:"Spray de 100 ml.",                                    categoria:"dermo", preco:16.90, emoji:"🦟", mip:false, estoque:40, ativo:true, destaque:true },
  { id:"hidratante-labial",nome:"Hidratante labial",           descricao:"Bastão com FPS 15.",                                  categoria:"dermo", preco:8.50,  emoji:"💋", mip:false, estoque:50, ativo:true, destaque:false },
  { id:"pos-sol",         nome:"Loção pós-sol",                descricao:"Frasco de 200 ml com aloe vera.",                     categoria:"dermo", preco:24.90, emoji:"🌵", mip:false, estoque:20, ativo:true, destaque:false },

  // Mãe e bebê
  { id:"fralda-m",        nome:"Fralda tamanho M",             descricao:"Pacote com 30 unidades.",                             categoria:"bebe", preco:36.90, emoji:"👶", mip:false, estoque:30, ativo:true, destaque:true },
  { id:"lenco-umedecido", nome:"Lenços umedecidos",            descricao:"Pacote com 48 unidades.",                             categoria:"bebe", preco:9.90,  emoji:"🧻", mip:false, estoque:50, ativo:true, destaque:false },
  { id:"pomada-assadura", nome:"Pomada para assaduras",        descricao:"Bisnaga de 45 g.",                                    categoria:"bebe", preco:18.50, emoji:"🧈", mip:true,  estoque:25, ativo:true, destaque:false },
  { id:"mamadeira",       nome:"Mamadeira 260 ml",             descricao:"Bico de silicone, sem BPA.",                          categoria:"bebe", preco:27.90, emoji:"🍼", mip:false, estoque:20, ativo:true, destaque:false },
  { id:"chupeta",         nome:"Chupeta ortodôntica",          descricao:"Silicone, a partir de 0 meses.",                      categoria:"bebe", preco:12.90, emoji:"🎀", mip:false, estoque:25, ativo:true, destaque:false },

  // Primeiros socorros
  { id:"curativos",       nome:"Curativos adesivos",           descricao:"Caixa com 40 unidades.",                              categoria:"primeiros", preco:8.90,  emoji:"🩹", mip:false, estoque:70, ativo:true, destaque:true },
  { id:"gaze",            nome:"Gaze estéril",                 descricao:"Pacote com 10 unidades.",                             categoria:"primeiros", preco:6.50,  emoji:"🧵", mip:false, estoque:60, ativo:true, destaque:false },
  { id:"esparadrapo",     nome:"Esparadrapo",                  descricao:"Rolo de 10 cm × 4,5 m.",                              categoria:"primeiros", preco:7.90,  emoji:"🩺", mip:false, estoque:40, ativo:true, destaque:false },
  { id:"termometro",      nome:"Termômetro digital",           descricao:"Leitura em 10 segundos.",                             categoria:"primeiros", preco:24.90, emoji:"🌡️", mip:false, estoque:25, ativo:true, destaque:true },
  { id:"agua-oxigenada",  nome:"Água oxigenada 10 vol.",       descricao:"Frasco de 100 ml.",                                   categoria:"primeiros", preco:4.90,  emoji:"🫗", mip:false, estoque:50, ativo:true, destaque:false },
  { id:"mascara",         nome:"Máscara descartável",          descricao:"Caixa com 50 unidades.",                              categoria:"primeiros", preco:19.90, emoji:"😷", mip:false, estoque:40, ativo:true, destaque:false },

  // Conveniência
  { id:"agua",            nome:"Água mineral",                 descricao:"Garrafa de 500 ml.",                                  categoria:"conveniencia", preco:2.90, emoji:"💦", mip:false, estoque:120, ativo:true, destaque:true },
  { id:"isotonico",       nome:"Isotônico",                    descricao:"Garrafa de 500 ml sabor limão.",                      categoria:"conveniencia", preco:6.50, emoji:"🥤", mip:false, estoque:60, ativo:true, destaque:false },
  { id:"barra-cereal",    nome:"Barra de cereal",              descricao:"Castanhas e mel.",                                    categoria:"conveniencia", preco:3.50, emoji:"🌾", mip:false, estoque:90, ativo:true, destaque:false },
  { id:"chocolate",       nome:"Chocolate ao leite",           descricao:"Barra de 80 g.",                                      categoria:"conveniencia", preco:7.90, emoji:"🍫", mip:false, estoque:70, ativo:true, destaque:false },
  { id:"balas",           nome:"Balas de menta",               descricao:"Pacote de 50 g.",                                     categoria:"conveniencia", preco:3.90, emoji:"🍬", mip:false, estoque:80, ativo:true, destaque:false },
  { id:"pilha-aa",        nome:"Pilhas AA",                    descricao:"Cartela com 4 unidades.",                             categoria:"conveniencia", preco:14.90, emoji:"🔋", mip:false, estoque:40, ativo:true, destaque:false }
];
