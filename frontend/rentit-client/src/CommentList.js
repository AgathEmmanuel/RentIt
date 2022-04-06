import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import './CommentList.css'



const CommentList = ({propPostId}) => {
    const [commentsList,setCommentsList]=useState([]);
    const getComments = async () => {
        const response = await axios.get(`http://localhost:4001/post/${propPostId}/comment`);
        console.log(`http://localhost:4001/post/${propPostId}/comment`)
        // make sure you destructure the props that is passed into the function
        // else for example in this case the dynamic url generated was like
        // this   http://localhost:4001/post/[object Object]/comment when  
        // const CommentList = (propPostId) => {
        // was used.
        // Got fixed when we used  
        // const CommentList = ({propPostId}) => {
        // and url came out to be http://localhost:4001/post/a867a32c/comment
        console.log("aaa",response)
        console.log("bbb",propPostId)
        setCommentsList(response.data);
    };
    useEffect(() => {
        getComments();
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //console.log(commentsList)
    const showComments = commentsList.map( comment => {
        return (
            <div 
            className="comment-container"
            key={comment.id}
            >
                <div className="comment-body">
                    <h3>comment: {comment.content}</h3>
                </div>
            </div>
        )
    });
  return (
    <div>
        {showComments} 
    </div>
  )
};

export default CommentList