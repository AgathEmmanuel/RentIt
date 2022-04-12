const axios = require('axios');
const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());

app.post('/events', async (req,res)=>{
    const {type,data} = req.body;
    console.log(type)
    console.log(data)

    if (type==='CommentCreationEvent') {
        const calculatedCensorStatus = data.content.includes('badword') ? 'rejected' : 'approved';
        await axios.post('http://localhost:4008/events',{
            type: 'CommentCensoredEvent',
            data: {
                "postId": data.postId,
                "commentId" : data.commentId,
                "content": data.content,
                "censorStatus": calculatedCensorStatus
            }
        })

    }

    res.send({});

});

app.listen(4003,()=>{
    console.log('Listening on port 4003');
})