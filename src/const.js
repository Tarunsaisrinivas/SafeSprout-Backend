require("dotenv").config();

const dbConnector = process.env.DB_CONNECTOR;

module.exports = { dbConnector: dbConnector };
