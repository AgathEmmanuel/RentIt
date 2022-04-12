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



app.get("/post", (req, res) => {
    res.send(postWithComments)
});

app.post("/events", (req, res) => {
    const { type, data } = req.body;
    if (type === 'PostCreationEvent') {
        const { postId, title } = data;
        postWithComments[postId]= { postId, title, comments: []};
    }
    if (type === 'CommentCreationEvent') {
        const { postId, commentId, content, censorStatus } = data;
        postWithComments[postId].comments.push({commentId,content,censorStatus})
    }
    console.log(postWithComments)
    if (type === 'CommentUpdationEvent') {
        const { postId,commentId,content,censorStatus } = data;
        const post = postWithComments[postId];
        const comment = post.comments.find(comment => {
            return comment.commentId === commentId;
        });
        comment.censorStatus=censorStatus;

        }

    res.send({});
});

app.listen(4002, () => {
  console.log("Listening on port 4002");
});
