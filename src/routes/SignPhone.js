import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authService } from "../fbase";

function SignPhone() {
    const navigate = useNavigate();

    let [number, setNumber] = useState("");
    let [show, setShow] = useState(false);
    let [OTPObj, setOTPObj] = useState();
    let [OTP, setOTP] = useState("");
    let [error, setError] = useState("");

    const onChange = (e) => {
        const {target: {name, value}} = e;
        
        if(name === "tel") {
            setNumber(value);
        } else {
            setOTP(value);
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();

        if(number === "" || number===undefined ) {
        } else {
            try {
                const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, authService);
                recaptchaVerifier.render();
                await signInWithPhoneNumber(authService, '+82 '+number, recaptchaVerifier)
                .then(async(result) => {
                    setShow((prev) => !prev);
                    console.log(result);
                    setOTPObj(result);
                }).catch((e) => {
                    setError(e.message);
                })  
                
            } catch(e) {
                setError(e.message);
            }
        }
    }
    const onSubmitOTP = async (e) => {
        e.preventDefault();
        try {
            await OTPObj.confirm(OTP);
            navigate('/', {replace: true})
        } catch(e) {
            setError(e.message);
        }
    }

    return( 
        <>
            <form onSubmit={onSubmit} >
                <input 
                type="tel"
                name="tel"
                value={number}
                onChange={onChange}
                required />
                <input
                type="submit"
                value="send OTP" />
                <div id="recaptcha-container"/>
            </form>
            <button onClick={() => {navigate('/')}}>cancel</button>
            {
                show? (
                    <form onSubmit={onSubmitOTP}>
                        <input 
                        type="text"
                        name="OTP"
                        value={OTP}
                        onChange={onChange}
                        required />
                        <input
                        type="submit"
                        value="check" />
                        <div id="recaptcha-container"/>
                    </form>
                ) : null
            }
            {error && <span>{error}</span>}
        </>
    )
}

export default SignPhone;