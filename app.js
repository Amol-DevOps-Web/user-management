const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const {Client} = require('pg')
const exphbs = require('express-handlebars')
const { postgresMd5PasswordHash } = require('pg/lib/utils')
const { Connection } = require('pg/lib')


require('dotenv').config();


const app = express()
const port = process.env.PORT || 8080
const publicDirPath = path.join(__dirname,'../public')
const viewTemp = path.join(__dirname,'../templates/views')
const partialsTemp = path.join(__dirname,'../templates/partials')


//Parseing middlerware
//Parse application /x-www-form-urlencoded
app.use(express.urlencoded({extended:false}));
//Parse application/json
app.use(express.json());
//Static files
app.use(express.static('public'))

//Templet handing 
const handlebars = exphbs.create({extname:'.hbs',})
app.engine('.hbs',handlebars.engine);
app.set('view engine','.hbs')

//Connection for Database

const routes = require('./server/routes/user')
app.use('/',routes)


app.listen(port,()=>{
    console.log(`Sever start on port ${port}`)
})