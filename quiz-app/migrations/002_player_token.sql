-- Device token so the same player can reclaim their nickname across sessions.
alter table players add column if not exists player_token text;

create unique index if not exists players_player_token_uidx
  on players (player_token)
  where player_token is not null;
