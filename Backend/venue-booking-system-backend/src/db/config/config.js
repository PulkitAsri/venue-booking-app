require("dotenv").config();

module.exports = {
  //fair
  development: {
    username: "pulkit",
    password: "pulkit",
    database: "venue_system",
    host: "127.0.0.1",
    dialect: "postgres",
    define: {
      //prevent sequelize from pluralizing table names
      freezeTableName: true,
    },
    dialectOptions: {
      useUTC: true,
    },
    // timezone: "+05:30",
    use_env_variable: process.env.DEV_DATABASE_URL,
  },
  //dummy-roots for future
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
    define: {
      //prevent sequelize from pluralizing table names
      freezeTableName: true,
    },
    dialectOptions: {
      useUTC: true,
    },
    use_env_variable: process.env.TEST_DATABASE_URL,
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
    define: {
      //prevent sequelize from pluralizing table names
      freezeTableName: true,
    },
    dialectOptions: {
      useUTC: true,
    },
    use_env_variable: process.env.DATABASE_URL,
  },
};
