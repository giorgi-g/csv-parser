import { DB_CONNECTION_STRING, DB_ENV, DB_PASSWORD, DB_PORT, DB_USER } from "../../config";

const {Sequelize} = require("sequelize");

export default (schema?: string) => (new Sequelize(
    DB_CONNECTION_STRING != null
        ? DB_CONNECTION_STRING : `postgres://${DB_USER}:${DB_PASSWORD}@pgsql.${DB_ENV}.frx:${DB_PORT}/${schema}`
))
