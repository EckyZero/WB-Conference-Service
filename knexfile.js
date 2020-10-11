const path = require('path');

const config = {
  local: {
    client: 'postgresql',
    useNullAsDefault: true,
    connection: 'postgres://postgres@127.0.0.1:5432/conference_db',
    seeds: {
      directory: path.join(__dirname, './src/database/seeds')
    },
    migrations: {
      directory: path.join(__dirname, './src/database/migrations')
    }
  },
  development: {
    client: 'postgresql',
    useNullAsDefault: true,
    connection: {
      host: 'postgres',
      user: 'postgres',
      password: 'postgres',
      database: 'conference_db'
    },
    seeds: {
      directory: path.join(__dirname, './src/database/seeds')
    },
    migrations: {
      directory: path.join(__dirname, './src/database/migrations')
    }
  },

  production: {
    client: 'postgresql',
    useNullAsDefault: true,
    connection: {
      host: 'postgres',
      user: 'postgres',
      password: 'postgres',
      database: 'conference_db'
    },
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: path.join(__dirname, './src/database/seeds')
    },
    migrations: {
      directory: path.join(__dirname, './src/database/migrations')
    }
  }
}

module.exports = config;
