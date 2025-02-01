const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*',
    methods: ["GET", "POST"]
}));


app.use(express.json());



var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://althertech23:ko230193@alther.2ec0f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, });

var resultado = [];
var resultadoP = [];


const port = process.env.PORT ?? 4000;


app.post('/gravar', cors(corsOptions), async (req, res) => {
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




app.post('/leitura', cors(corsOptions), async (req, res) => {

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

app.post('/encartes', cors(corsOptions), async (req, res) => {

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
  



  app.post('/search', cors(corsOptions), async (req, res) => {

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
    







app.get('/', cors(corsOptions), (req, res) => {
  res.send('Api EncarteFácil. Feito por AltherTech!')
})


app.listen(port, () => console.log('Server is running on port ', port))
