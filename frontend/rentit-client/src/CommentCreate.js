import React from "react";
import { useState } from "react";
import axios from 'axios';


const CommentCreate = ({ propPostId }) => {
    const [comment, setComment]=useState('');

    const onSubmit=async (event)=>{
    console.log(comment)
        event.preventDefault();
        await axios.post(`http://localhost:4001/post/${propPostId}/comment`,{content: comment});
        // make sure you pass in the comment withe parameter as content since thats how
        // its specified in the backend
        // https://stackoverflow.com/questions/44617825/passing-headers-with-axios-post-request
        setComment('');
    }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="post-create-form">
          <label>Ad Comment</label>
          <input 
            value={comment} 
            onChange={event => setComment(event.target.value)} 
            className="post-create-form-input" 
          />
        </div>
        <button className="button post-create-button">Create</button>
      </form>
    </div>
  );
};

export default CommentCreate;
