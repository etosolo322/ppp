
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
var resultMain=[];

const menuSearch = (kinder) =>{

MongoClient.connect(url, (err, client) => {
assert.equal(null, err);

const db = client.db(dbName);
const collection =db.collection('menu');
        collection.find({ kind:kinder }).toArray((err, results)=>{
            if(err) console.log(err);
            resultMain = results;
        //   console.log(resultMain);
          client.close();
        })
      });
console.log("Connected FUCKING for search MONGODB");
return resultMain;
};
module.exports = menuSearch;
