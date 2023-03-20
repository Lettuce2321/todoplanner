import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authServise } from "../fbase";
import { async } from "@firebase/util";

function SignPhone() {
    const navigate = useNavigate();

    let [number, setNumber] = useState("");
    let [show, setShow] = useState(false);
    let [OTPObj, setOTPObj] = useState();
    let [OTP, setOTP] = useState("");

    const onChange = (e) => {
        const {target: {name, value}} = e;
        
        if(name === "tel") {
            setNumber(value);
        } else {
            setOTP(value);
            console.log(OTP);
        }
    }
    const onSubmit = async (e) => {
        e.preventDefault();

        if(number === "" || number===undefined ) {
        } else {
            try {
                const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, authServise);
                recaptchaVerifier.render();
                await signInWithPhoneNumber(authServise, '+82 '+number, recaptchaVerifier)
                .then(async(result) => {
                    setShow((prev) => !prev);
                    console.log(result);
                    setOTPObj(result);
                }).catch((e) => {
                    console.log(e)
                })  
                
            } catch(e) {

            }
        }
    }
    const onSubmitOTP = async (e) => {
        e.preventDefault();
        try {
            await OTPObj.confirm(OTP);
            navigate('/')
        } catch(e) {

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
                <button onClick={() => {navigate('/')}}>cancel</button>
                <div id="recaptcha-container"/>
            </form>
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
        </>
    )
}

export default SignPhone;