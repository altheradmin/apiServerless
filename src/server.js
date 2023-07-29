const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.use(express.json());

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://althertech23:ko230193@alther.2ec0f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, });

var resultado = [];
var resultadoP = [];


const port = process.env.PORT ?? 4000;


app.post('/gravar', async (req, res) => {
  res.send('STATUS OK');
var objobj = req.body;



MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("vinicius");

    dbo.collection("produtos").insertOne(objobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });

})




app.post('/leitura', async (req, res) => {

function all(params) {
  res.send(params);
}
MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("vinicius");
  dbo.collection("produtos").find({}).toArray(function(err, result) {
    if (err) throw err;
    all(result);
    db.close();
  });
});

})

app.post('/encartes', async (req, res) => {

  function all(params) {
    res.send(params);
  }
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("vinicius");
    dbo.collection("encartes").find({}).toArray(function(err, result) {
      if (err) throw err;
      all(result);
      db.close();
    });
  });
  
  })
  



  app.post('/search', async (req, res) => {

    var search01 = req.body.produto;
    var reg1 = new RegExp(search01, 'i');

    function resposta(paramsR) {
      res.send(paramsR)
    }
    
MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("vinicius");
  var query = { name: reg1 };
  dbo.collection("produtos").find(query).toArray(function(err, result) {
    if (err) throw err;
    resposta(result);
     db.close();
  });
});





    })
    







app.get('/', (req, res) => {
  res.send('Api EncarteFácil. Feito por AltherTech!')
})


app.listen(port, () => console.log('Server is running on port ', port))
