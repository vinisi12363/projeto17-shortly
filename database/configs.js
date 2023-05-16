CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  shortUrl VARCHAR UNIQUE NOT NULL,
  url VARCHAR NOT NULL,
  visitCount INTEGER,
  userId INTEGER REFERENCES users(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE USER shortlydbuser WITH PASSWORD 'senha_ultra_secreta_do_usuario_shortlydbuser';

GRANT ALL PRIVILEGES ON DATABASE shortlydb TO shortlydbuser;


postgresql://shortlydbuser:senha_ultra_secreta_do_usuario_shortlydbuser@localhost:5432/nome_do_banco_de_dados