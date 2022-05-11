const {Sequelize} = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_ENV, DB_PORT } = require("./configs");

export default (schema: string) => (new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@pgsql.${DB_ENV}.frx:${DB_PORT}/${schema}`
))
