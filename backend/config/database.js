const {Sequelize} = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:"postgres",
        port:process.env.DB_PORT
    }
)

sequelize.authenticate()
.then(()=>console.log('connected to Database'))
.catch((err)=>console.log(`failed to connect DB ${err}`))
    

module.exports = sequelize
