import React from "react";
import { useState } from "react";
import axios from 'axios';


const PostCreate = () => {
    const [title, setTitle]=useState('');

    const onSubmit=async (event)=>{
        event.preventDefault();
        await axios.post('http://localhost:4000/post',{title});
        setTitle('');
    }
  return (
    <div>
      <h1>Post your Rental</h1>
      <form onSubmit={onSubmit}>
        <div className="post-create-form">
          <label>Ad Title</label>
          <input 
            value={title} 
            onChange={event => setTitle(event.target.value)} 
            className="post-create-form-input" 
          />
        </div>
        <button className="button post-create-button">Create</button>
      </form>
    </div>
  );
};

export default PostCreate;
