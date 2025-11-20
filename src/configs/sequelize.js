const { Sequelize } = require('sequelize');
require('dotenv').config();

const dialect = process.env.DB_DIALECT;
if (!dialect) {
  throw new Error('Missing DB_DIALECT environment variable. Set DB_DIALECT (e.g. "mysql", "postgres", "mssql").');
}

// Tạo instance Sequelize
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT && Number(process.env.DB_PORT),
    dialect: dialect,
    logging: true
  }
);

// Hàm kiểm tra kết nối
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Kết nối Sequelize với MySQL thành công.');
  } catch (error) {
    console.error('❌ Lỗi kết nối Sequelize:', error);
  }
}

testConnection();

module.exports = sequelize;