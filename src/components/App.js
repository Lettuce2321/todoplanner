import React, {useState, useEffect} from "react";
import Router from "./Router.js";
import { authServise } from "../fbase.js";

function App() {
  
  let [init, setInit] = useState(false);
  let [isLoggedin, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authServise.onAuthStateChanged((user) => {
      if(user) {
        console.log(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false)
      }
      setInit(true);
    })
  },[])
  
  return (
    <>
      {
        init ? <Router isLoggedin={isLoggedin}/> : <h1>Initializing!</h1>
      }
    </>
  );
}

export default App;
