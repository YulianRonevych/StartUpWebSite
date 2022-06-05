const express = require('express');
const app = express();
const cors = require('cors');
const db = require("./dbconnection.js");

app.use(express.urlencoded({extended: false}))
app.use(cors());
app.use(express.json())
app.use(express.static('images'))

app.post('/register', function(req,res){
   res.status(200).send('Success');
   const data = req.body;
   console.log(data);
   const username = data.username;
   const password = data.password;
   const name = data.name;
   const surname = data.surname;
   const country = data.country;
   const city = data.city;
   const email = data.email;

   db.getConnection(function(err, connection) {
    if (err) {
        connection.release();
          console.log(' Error getting mysql_pool connection: ' + err);
          throw err;
      }
   db.query(
       "INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?)",
       [username, password, name, surname, country, city, email],
       (err, result) => {
           if(err){
           console.log(err);
           }
       }
   );
   connection.release();
    });
})

app.get('/register', function(req,res){
    res.setHeader("Content-Type", "application/json");

    db.getConnection(function(err, connection) {
        if (err) {
            connection.release();
              console.log(' Error getting mysql_pool connection: ' + err);
              throw err;
          }
       db.query(
           "SELECT * FROM users;",
           (err, result) => {
               if(err){
               throw err;
               }else{
               res.status(200).send(result);
               }
           }
       );
       connection.release();
        });
})



/*Uploading images*/

const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'images')
    },
    filename: (req, file, cb) =>{
        console.log(req);
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: fileStorageEngine
})

app.post('/upload', upload.single('image'), (req, res)=>{
    console.log(req.body);
    res.send('Single file upload success');
})

/*Uploading images*/


/*Submiting start-up*/


app.post('/createStartUp', function(req,res){
    res.status(200).send('Success');
    const data = req.body;
    console.log(data);
    const id = data.id;
    const user = data.user;
    const name = data.name;
    const description = data.description;
    const raiseDate = data.raiseDate;
    const endDate = data.endDate;
    const dateOfCreation = data.dateOfCreation;
    const raiseAmount = Number.parseFloat(data.raiseAmount);
    const filetype = data.filetype;
 
    db.getConnection(function(err, connection) {
     if (err) {
         connection.release();
           console.log(' Error getting mysql_pool connection: ' + err);
           throw err;
       }
    db.query(
        "INSERT INTO startups VALUES(?,?,?,?,?,?,?,?,?)",
        [id,user,name,description,raiseDate,endDate,dateOfCreation,raiseAmount, filetype],
        (err, result) => {
            if(err){
            console.log(err);
            }
        }
    );
    connection.release();
     });
 })

/*Submiting start-up*/


/*Send single start-up data*/
app.get('/startUpItem/:id', function(req,res){
    res.setHeader("Content-Type", "application/json");

    db.getConnection(function(err, connection) {
        if (err) {
            connection.release();
              console.log('Error getting mysql_pool connection: ' + err);
              throw err;
          }
       db.query(
           `SELECT * FROM startups WHERE startups.id = '${req.params.id}';`,
           (err, result) => {
               if(err){
               throw err;
               }else{
               res.status(200).send(result);
               }
           }
       );
       connection.release();
        });
})
/*Send single start-up data*/


/*Send all start-up data*/
app.get('/startups', function(req,res){
    res.setHeader("Content-Type", "application/json");

    db.getConnection(function(err, connection) {
        if (err) {
            connection.release();
              console.log('Error getting mysql_pool connection: ' + err);
              throw err;
          }
       db.query(
           `SELECT * FROM startups;`,
           (err, result) => {
               if(err){
               throw err;
               }else{
               res.status(200).send(result);
               }
           }
       );
       connection.release();
        });
})
/*Send single start-up data*/

app.listen(process.env.PORT | 5000, function(){
    console.log('Server is listening...');
})


