module.exports = {
  port: process.env.PORT || 8000,
  db: {
    database: process.env.DB_NAME || 'skiscores',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
      // Options
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './db/skiscores.sqlite'
  }
}
