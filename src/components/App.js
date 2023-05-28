import React, {useState, useEffect} from "react";
import Router from "./Router.js";
import { authService } from "../fbase.js";

function App() {
  
  let [init, setInit] = useState(false);
  let [isLoggedin, setIsLoggedIn] = useState(false);
  let [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false)
        setUserObj(null);
      }
      setInit(true);
    })
  },[])
  
  return (
    <>
      {
        init ? <Router isLoggedin={isLoggedin} userObj={userObj} /> : <h1>Initializing!</h1>
      }
    </>
  );
}

export default App;
