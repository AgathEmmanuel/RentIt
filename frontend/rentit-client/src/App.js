import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./Header";
import PageNotFound from "./PageNotFound";
import SignUp from "./SignUp";
import Login from "./Login";

const App = () => {
  return (
      <div className="App">
      <BrowserRouter> 
      <Header />
      <Routes>
      <Route path='/home' element={<PostList />} />
      <Route path='/product' element={<PostCreate />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/*' element={<PageNotFound />} />
      </Routes>
      </BrowserRouter>

      </div>
      )
};

export default App;
