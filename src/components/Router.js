import React from "react";
import { Routes, Route  } from "react-router-dom";
import Auth from "../routes/Auth"
import ToDoPage from "../routes/ToDoPage"
import CreateUser from "../routes/CreateUser"
import SignPhone from "../routes/SignPhone";

function Router({isLoggedin, userObj}) {

    return (
        <Routes>
            {
                isLoggedin ? (
                <Route path="/" element={<ToDoPage userObj={userObj}/>} /> 
                ) : (
                <>
                    <Route path="/" element={<Auth />} />
                    {
                        !isLoggedin ? (
                            <>
                                <Route path="/signPhone" element={<SignPhone />} />
                                <Route path="/createAccount" element={<CreateUser />} />    
                            </> 
                        ) : null
                    }
                </>
                )
            } 
        </Routes>
    )
}

export default Router;
