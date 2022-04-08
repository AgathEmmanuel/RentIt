import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import './PostList.css'
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
    const [posts,setPosts]=useState({});
    const getPosts = async () => {
        const response = await axios.get('http://localhost:4002/post');
        setPosts(response.data);
    };
    useEffect(() => {
        getPosts();
    },[]);
    // console.log(posts)
    const showPosts = Object.values(posts).map(post => {
    console.log(post.postId)
        return (<div 
            className="post-container"
            key={post.postId}
            >
                <div className="post-body">
                    <h1>{post.title}</h1>
                    <h3>{post.postId}</h3>
                    
                    <CommentCreate propPostId={post.postId} />
                    <CommentList commentsList={post.comments} /> 
                    {/* <CommentList propPostId={post.postId} /> */}
                </div>
        </div>
        )
    });

  return <div>
      {showPosts}
  </div>;
};

export default PostList;
