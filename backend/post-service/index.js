
const express = require('express');

const app = express();

const post = {};


app.get('/post',(req,res) => {
    res.send(post);

});

app.post('/post',(req,res) => {

});


app.listen(4000, () => {
    console.log('listening on port 4000');
});

