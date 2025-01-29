import { Sequelize } from "sequelize";
require('dotenv').config();


const sequelize: Sequelize = new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
  host: 'todo-mysql',
  dialect: 'mysql'
});

export default sequelize;