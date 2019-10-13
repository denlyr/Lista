var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ben:12300qwe@list-hityf.mongodb.net/test?retryWrites=true&w=majority'
);

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'flores'}).save(function(err){
    if (err) throw err;
    console.log('item saved');
});


/*

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ben:12300qwe@list-hityf.mongodb.net/admin?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
    var itemOne = Todo({item: 'flores'}).save(function(err){
        if (err) throw err;
        console.log('item saved');
    });
  client.close();
});*/


var data = [{item: 'Uno'}, {item: 'Dos'}, {item: 'Tres'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req,res){
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodedParser, function(req,res){
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item', function(req ,res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });

};