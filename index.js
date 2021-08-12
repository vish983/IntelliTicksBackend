var express = require ('express');
var cors = require('cors');
const app = express();
const MongoClient = require('mongodb').MongoClient
const port = 3000;
var bodyParser = require('body-parser');


app.use(bodyParser.json())
app.use(cors());


app.post('/insertData', (req, res) => {
    userDetails = req.body;
    MongoClient.connect('mongodb://localhost:27017/', {useUnifiedTopology: true, useNewUrlParser:true}, (error, dbInstance) => {
        if (error) {
            res.send({message:'Error while connecting DB'});
        } else {

            dbInstance.db('intellitics-DB').collection('users').insertOne(userDetails, (error, response) => {
                if(error){
                    res.send({message:'error in updating data'});
                }else{
                    res.send({message: 'Successfully inserted'});
                }
            })
        }
    })
})
app.post('/insertBulk', (req, res) => {
    userDetailsArray = req.body;
    MongoClient.connect('mongodb://localhost:27017/', {useUnifiedTopology: true, useNewUrlParser:true}, (error, dbInstance) => {
        if (error) {
            res.send({message:'Error while connecting DB'});
        } else {

            dbInstance.db('intellitics-DB').collection('users').insertMany(userDetailsArray, (error, response) => {
                if(error){
                    res.send({message: 'error in updating data'});
                }else{
                    res.send({message: 'Buld data Successfully inserted'});
                }
            })
        }
    })
})

app.get('/getAllData', (req, res) => {
    MongoClient.connect('mongodb://localhost:27017/', {useUnifiedTopology: true, useNewUrlParser:true}, (error, client) => {
        if (error) {
            res.send({message:'Error while connecting DB'});
        } else {
            client.db('intellitics-DB').collection('users').find({}).toArray((err, result) => {
                if(err){
                    res.send({message:'collection not found'})
                }else {
                    res.send(result)
                }
            })
        }
    })
})

app.delete('/delete', (req, res) => {
    userIdObj = req.body;
    MongoClient.connect('mongodb://localhost:27017/', {useUnifiedTopology: true, useNewUrlParser:true}, (error, dbinsta) => {
        if (error) {
            res.send({message:'Error while connecting DB'});
        } else {
            dbinsta.db('intellitics-DB').collection('users').deleteOne(userIdObj, (err, obj) => {
                if(err) {
                    res.send({message:'NOT Found'})
                } else{
                    res.status(200).send({message: 'Deleted'});
                }
                
            })
          }
    })
})


  
app.listen(port, () => {
    console.log('Server started');
})