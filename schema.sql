-- Totem de autoatendimento — esquema do Supabase
-- Cole tudo no SQL Editor do Supabase e execute uma vez.

create table if not exists produtos (
  id         text primary key,
  nome       text not null,
  descricao  text default '',
  categoria  text not null,
  preco      numeric(10,2) not null check (preco >= 0),
  emoji      text default '💊',
  mip        boolean not null default false,   -- medicamento isento de prescrição
  estoque    integer not null default 0,
  ativo      boolean not null default true,
  destaque   boolean not null default false
);

create table if not exists pedidos (
  id                   uuid primary key default gen_random_uuid(),
  numero               integer generated always as identity,
  itens                jsonb not null,
  total                numeric(10,2) not null check (total >= 0),
  pagamento            text not null,
  precisa_farmaceutico boolean not null default false,
  status               text not null default 'novo'
                       check (status in ('novo','preparando','pronto','entregue','cancelado')),
  criado_em            timestamptz not null default now()
);

create table if not exists chamados (
  id        uuid primary key default gen_random_uuid(),
  motivo    text not null,
  status    text not null default 'aberto' check (status in ('aberto','atendido')),
  criado_em timestamptz not null default now()
);

create index if not exists pedidos_criado_em_idx on pedidos (criado_em desc);
create index if not exists chamados_criado_em_idx on chamados (criado_em desc);

-- Segurança (RLS)
alter table produtos enable row level security;
alter table pedidos  enable row level security;
alter table chamados enable row level security;

-- Totem e tela de retirada (chave anon): lê produtos, cria pedidos/chamados, lê pedidos
create policy "produtos: leitura pública" on produtos for select using (true);
create policy "pedidos: leitura pública"  on pedidos  for select using (true);
create policy "pedidos: totem cria"       on pedidos  for insert to anon, authenticated with check (status = 'novo');
create policy "chamados: leitura pública" on chamados for select using (true);
create policy "chamados: totem cria"      on chamados for insert to anon, authenticated with check (status = 'aberto');

-- Painel da loja (usuário logado): tudo
create policy "produtos: admin" on produtos for all    to authenticated using (true) with check (true);
create policy "pedidos: admin"  on pedidos  for update to authenticated using (true) with check (true);
create policy "chamados: admin" on chamados for update to authenticated using (true) with check (true);

-- Tempo real
alter publication supabase_realtime add table pedidos, chamados, produtos;
