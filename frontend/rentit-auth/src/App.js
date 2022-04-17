import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './signIn'
import SignUp from './signUp'

const App = () => {
    return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/signin" exact element={<SignIn />} />
        </Routes>
        </BrowserRouter>
    </div>
    )
}


export default App