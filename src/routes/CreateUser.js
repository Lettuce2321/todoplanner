import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authServise } from "../fbase";
import { Link, useNavigate } from "react-router-dom"
import { async } from "@firebase/util";

const CreateUser = () => {

    let navigate = useNavigate();
    
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const onChange = function(e) {
        let {target: {name, value}} = e;
        if(name === "email") {
            setEmail(value);
        } else {
            setPassword(value);
        }
    }
    const onSubmit = async function(e) {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(authServise, email, password)
            navigate('/', {replace: true})
        } catch(e) {
            console.log(e.message);
        }
    }

    return (
        <>  
            <form onSubmit={onSubmit}>
                <input 
                type="email"
                name="email"
                placeholder="example@company.com"
                onChange={onChange}
                value={email}
                required />
                <input
                type="password"
                name="password"
                onChange={onChange}
                value={password}
                required />
                <input
                type="submit"
                value="Log In"
                onClick={()=> {console.log('click')}} />
            </form>
            <div>
                <span>Are you existing user?</span>
                <Link to="/">Login</Link>
            </div>
        </>
    )
}

export default CreateUser;