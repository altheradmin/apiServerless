const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const port = process.env.PORT ?? 4000;





const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://althertech23:ko230193@alther.2ec0f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, });

var resultado = [];
var resultadoP = [];





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
  


app.listen(port, () => console.log('Server is running on port ', port))
