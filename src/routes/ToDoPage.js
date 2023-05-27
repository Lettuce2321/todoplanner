import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { dbCollection, dbOnSnapShot, dbQuery, dbService, dbOrderBy } from "../fbase";
import List from "../components/List";
import MakeList from "../components/MakeList.js"
import styled from 'styled-components';


function ToDoList({userObj}) {

    const userUID = userObj.uid;

    let [list, setList] = useState([]);
    let [count, setCount] = useState(0);

    const [checkedItems, setCheckedItems] = useState(new Set());     

    useEffect(() => {
        const q = dbQuery(dbCollection(dbService, userUID.toString()), dbOrderBy("createAt"));
        dbOnSnapShot(q, (snapshot) => {
            const todoList = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()   
                    }))
            setList(todoList);
        });
        console.log("loading");
    },[])

    useEffect(() => {
        console.log("change");
    }, [list]);

    return(
        <>
            <input type="checkbox"/>
            <MakeList userUID={userUID}/>

            <div>
                <ProgressContainer>
                    <Progress width={ count*100/list.length + "%"}></Progress>
                </ProgressContainer>
                {
                    list.map((a, i) => {                        
                        return(
                            <List key={i} userUID={userUID} a={a} checkedItems={checkedItems} setCheckedItems={setCheckedItems} setCount={setCount} count={count}/>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ToDoList;

const ProgressContainer = styled.div`
  margin: 50px auto;
  background-color: #eee;
  width: 500px;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 20px;
`;
const Progress = styled.div`
  background-color: blue;
  width: ${props => props.width};
  height: 100%;
  transition: width 1s;
  border-radius: 20px;
`;

