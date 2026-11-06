-- Reserved for Cursor published Postgres (unique nicknames + scores).
-- Local preview uses localStorage nameDb until DATABASE_URL is available.

create table if not exists players (
  id bigserial primary key,
  name text not null,
  name_key text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists scores (
  id bigserial primary key,
  player_id bigint not null references players (id),
  score integer not null,
  correct integer not null,
  total integer not null,
  percent integer not null,
  best_streak integer not null default 0,
  rank_label text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists scores_score_idx on scores (score desc, percent desc);
