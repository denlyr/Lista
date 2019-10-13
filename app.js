var express = require('express');
var todoControl = require('./todoControl');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

todoControl(app);

app.listen(3000);
console.log('Puerto 3000');
