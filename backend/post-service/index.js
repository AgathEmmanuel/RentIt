
const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


/*
------- end points

/post   POST   {title: string}   create a new post
/post   GET           -          get all posts

*/

const posts = {
    "11":{
    "postId": "11",
    "title": "dummy post"}
};


app.get('/post',(req,res) => {
    res.send(posts);

});

app.post('/post',(req,res) => {
    const postId = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[postId]= { postId, title };
    res.status(201).send(posts[postId]);
});


app.listen(4000, () => {
    console.log('listening on port 4000');
});

