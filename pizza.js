
const express = require('express');
const bodyParser = require( 'body-parser' );
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/';
const dbName = 'pizza';

app.use( bodyParser.urlencoded( {extended:true} ) );
app.use( bodyParser.json() )
app.use('/public', express.static('public'));

MongoClient.connect(url, (err, client) => {
assert.equal(null, err);
console.log("Connected FUCKING MONGODB");
const db = client.db("pizza");
const collection =db.collection('event');

app.listen(3000, () => {
  console.log('--//API  start 3000--//')
})﻿;

  app.post("/write", (req,res) => {
    var event = {   "date":req.body.date,
                    "name":String(req.body.name),
                    "text":String(req.body.text)
                  };
    collection.insertOne(event,(err,result)=>{
        if(err){
          console.log(err);
          res.sendStatus(500);
        }
      client.close();
      res.redirect('/write')
    })
  })
});

var refresh = require("./public/modules/eventRefresh");
var post =require("./public/modules/menuSearch");

app.get('/', (req, res) => {
        res.render ('index.ejs');
      } );


    app.get('/menu/:id', (req,res) => {
  if (req.params.id ==="pizza") {res.render('menu.ejs',{post:post('pizza')});
console.log('go to pizza')};
  if (req.params.id ==="hot") res.render('menu.ejs',{post:post('hot')});
  if (req.params.id ==="grille") res.render('menu.ejs',{post:post('grille')});
  if (req.params.id ==="drink") res.render('menu.ejs',{post:post('drink')});
    })

/*
      app.get('/menu', (req,res) => {
      res.render('menu.ejs', {post:post()});
    })
*/

    app.get('/write', (req,res)=>{
    res.render ('write.ejs', {mainCenter:refresh()});

    })
