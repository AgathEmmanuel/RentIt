
const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());


/*
------- end points

/post   POST   {title: string}   create a new post
/post   GET           -          get all posts

*/

const post = {};


app.get('/post',(req,res) => {
    res.send(post);

});

app.post('/post',(req,res) => {
    const postId = randomBytes(4).toString('hex');
    const { title } = req.body;
    post[postId]= { postId, title };
    res.status(201).send(post[postId]);
});


app.listen(4000, () => {
    console.log('listening on port 4000');
});

