import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import { authService } from "../fbase";

function Auth() {

    const navigate = useNavigate();

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
            await signInWithEmailAndPassword(authService, email, password)
        } catch(e) {
            console.log(e.message);
        }
    }
    const onSocialClick = async() => {

        let provider = new GoogleAuthProvider();
        await signInWithPopup(authService, provider);
    }
    const onPhoneClick = () => {
        navigate('/signPhone');
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
                value="Log In" />
            </form>
            <div>
                <span>Are you first logIn?</span>
                <Link to="/createAccount">Create Account</Link>
            </div>
            <div>
                <button name="Google" onClick={onSocialClick}>Continue with Google</button>
                <button name="Phone" onClick={onPhoneClick}>Continue with Phone number</button>
            </div>
        </>
    )
}

export default Auth;