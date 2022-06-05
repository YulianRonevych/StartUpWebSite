const sql = require("mysql");

const db = sql.createPool({
    connectionLimit: 100,
    user: "b8bb717fcc6c7c",
    host: "eu-cdbr-west-02.cleardb.net",
    password: "8a9e21aa",
    database: "heroku_4ede735f9c99ba7"
}
);

module.exports = db;

//mysql://b8bb717fcc6c7c:8a9e21aa@eu-cdbr-west-02.cleardb.net/heroku_4ede735f9c99ba7?reconnect=true