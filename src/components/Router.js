import React from "react";
import { Routes, Route, useNavigate  } from "react-router-dom";
import Auth from "../routes/Auth"
import ToDoPage from "../routes/ToDoPage"
import CreateUser from "../routes/CreateUser"
import SignPhone from "../routes/SignPhone";

function Router({isLoggedin}) {

    return (
        <Routes>
            {
                isLoggedin ? (
                <Route path="/" element={<ToDoPage/>} /> 
                ) : (
                <>
                    <Route path="/" element={<Auth />} />
                    <Route path="/createAccount" element={<CreateUser />} />
                    <Route path="/signPhone" element={<SignPhone />} />
                </>
                )
            } 
        </Routes>
    )
}

export default Router;
