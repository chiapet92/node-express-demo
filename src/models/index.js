import Sequelize from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_ENDPOINT,
    dialect: process.env.DATABASE,
    port: process.env.DATABASE_PORT
  });

// const sequelize = new Sequelize('postgres://postgres:mysecretpassword@nodeexpressdemo_db_1:5432/postgres');

const models = {
  User: sequelize.import("./user"),
  Message: sequelize.import("./message")
};
Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});
export { sequelize };
export default models;
