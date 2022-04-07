const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());


const postWithComments = {
    '11': {
        postId: '11',
        title: 'subject title',
        comments: [
            { commentId: 'llcc', content: 'comment'}
        ]
    }
};



app.get("/posts", (req, res) => {
    res.send(postWithComments)
});

app.post("/events", (req, res) => {
    const { type, data } = req.body;
    if (type === 'PostCreationEvent') {
        const { postId, title } = data;
        postWithComments[postId]= { postId, title, comments: []};
    }
    if (type === 'CommentCreationEvent') {
        const { postId, commentId, content } = data;
        postWithComments[postId].comments.push({commentId,content})
    }
    console.log(postWithComments)
    res.send({});
});

app.listen(4002, () => {
  console.log("Listening on port 4002");
});
