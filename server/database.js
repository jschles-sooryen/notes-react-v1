// const { Sequelize } = require('sequelize');
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  'react_notes',
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
);

sequelize.authenticate()
  .then(() => console.log('DB Connection Authenticated'))
  .catch((e) => console.error('DB Connection error: \n', e));

export default sequelize;
