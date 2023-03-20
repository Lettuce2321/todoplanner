import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDzA3bEFBskUFt6gFHUmhL7O6_Ek90b-hk",
  authDomain: "todoplanner-68170.firebaseapp.com",
  projectId: "todoplanner-68170",
  storageBucket: "todoplanner-68170.appspot.com",
  messagingSenderId: "824660025161",
  appId: "1:824660025161:web:800eb97af8cca609dd0498"
};

initializeApp(firebaseConfig);

export const authServise = getAuth();