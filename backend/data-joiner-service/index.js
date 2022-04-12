const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');
const e = require("express");

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


const eventHandler = (type,data) => {
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

};



app.get("/post", (req, res) => {
    res.send(postWithComments)
});

app.post("/events", (req, res) => {
    const { type, data } = req.body;

    eventHandler(type,data);

    /*
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

    */

    res.send({});
});

app.listen(4002, async() => {
  console.log("Listening on port 4002");

  try {
  const res = await axios.get('http://localhost:4008/events');

  for (let event of res.data) {
      console.log('Handling event:', event.type);
      eventHandler(event.type, event.data);

  }
} catch (error) {
    console.log(error.message);
}

});
