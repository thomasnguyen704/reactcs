require('dotenv').config()
const {POSTGRES_ENV_DB_NAME, POSTGRES_ENV_POSTGRES_USER, POSTGRES_ENV_POSTGRES_PASSWORD} = process.env

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: "./mydb.sqlite"
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations_dev'
    }
  },
  staging: {
    client: 'pg',
    connection: {
      host: 'capstone',
      database: POSTGRES_ENV_DB_NAME,
      user:     POSTGRES_ENV_POSTGRES_USER,
      password: POSTGRES_ENV_POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations_stage'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: 'capstone',
      database: POSTGRES_ENV_DB_NAME,
      user:     POSTGRES_ENV_POSTGRES_USER,
      password: POSTGRES_ENV_POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations_prd'
    }
  }
};