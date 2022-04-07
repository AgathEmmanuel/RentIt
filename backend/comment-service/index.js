const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto')
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use(cors());


/*
-----------  end points

pass in the id of the post and get back all the comments for that post
id => postId
/post/:id/comment       POST   {id:'xyzz',content:'superb}    create a new comment for a post id
/post/:id/comment       GET          -                        get all comments for a post id

*/

const commentsForPostId={
    "11":
    [
        {
        "id": "11111",
        "content": "adding comment2 to 11"
        }
    ]
};
// 

app.post('/post/:id/comment', async(req,res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsForPostId[req.params.id] || []; // req.params.id => id from url
    comments.push({id:commentId, content });
    commentsForPostId[req.params.id]=comments;
    await axios.post('http://localhost:4008/events', {
        type: 'CommentCreationEvent',
        data: {
                "postId": req.params.id,
                "commentId" : commentId,
                "content": content
        }
    })
    res.status(201).send(comments)
});


app.get('/post/:id/comment',(req,res) => {
    res.send(commentsForPostId[req.params.id] || [{"id":"12","content":"Keep it up"},{"id":"13","content":"Good work"} ]);
});


app.post('/events', (req, res) => {
    console.log('Event', req.body.type);
    res.send({});
})

app.listen(4001,() => {
    console.log('listening on port 4001')
});