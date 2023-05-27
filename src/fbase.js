import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore, addDoc, getDocs, collection, query, onSnapshot, deleteDoc, updateDoc, doc, orderBy } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDzA3bEFBskUFt6gFHUmhL7O6_Ek90b-hk",
  authDomain: "todoplanner-68170.firebaseapp.com",
  projectId: "todoplanner-68170",
  storageBucket: "todoplanner-68170.appspot.com",
  messagingSenderId: "824660025161",
  appId: "1:824660025161:web:800eb97af8cca609dd0498"
};

initializeApp(firebaseConfig);

export const authService = getAuth();
export const dbService = getFirestore();
export const dbAddDoc = addDoc;
export const dbGetDocs = getDocs;
export const dbCollection = collection;
export const dbQuery = query;
export const dbOnSnapShot = onSnapshot;
export const dbDoc = doc;
export const dbdeleteDoc = deleteDoc;
export const dbUpdataDoc = updateDoc;
export const dbOrderBy = orderBy;