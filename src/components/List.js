import React from "react";
import { useState } from "react";
import { dbdeleteDoc, dbDoc, dbService, dbUpdataDoc } from "../fbase";

function List({userUID, a, checkedItems, setCheckedItems, setCount }) {
    const docRef = dbDoc(dbService, userUID.toString(), a.id);

    const [bChecked, setChecked] = useState(a.isChecked);    

    const checkedItemHandler = async(id, isChecked) => {

        if (isChecked) {
            checkedItems.add(id);
            setCheckedItems(checkedItems);
            setCount((prev) => (prev+1));
            await dbUpdataDoc(docRef, {isChecked: true});
        } else if (!isChecked && checkedItems.has(id)) {
            checkedItems.delete(id);
            setCheckedItems(checkedItems);
            await dbUpdataDoc(docRef, {isChecked: false});
            setCount((prev) => (prev-1));
        }
    };
    const checkHandler = async(id, { target }) => {
        checkedItemHandler(id, target.checked);
        await dbUpdataDoc(docRef, {isChecked: checkedItems.has(a.id)});
    };

    return (
        <div style={{border: "1px solid black", borderRadius: "5px"}}>
            <input type="checkbox" checked={ a.isChecked } onChange = {(e) => checkHandler(a.id, e)}></input>
            <h4>{a.text}</h4>
            <button onClick={async() => {
                if(a.isChecked) window.alert("can't");
                else {
                    const ok = window.confirm('Are you sure you want to delete this nweet?');
                    if(ok) {
                        checkedItems.delete(a.id);
                        setCheckedItems(checkedItems);
                        await dbdeleteDoc(docRef);
                    } 
                }
            }}>Delete</button>
        </div>
    )
}

export default List;