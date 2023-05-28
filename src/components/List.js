import React from "react";
import { dbdeleteDoc, dbDoc, dbService, dbUpdataDoc } from "../fbase";

function List({userUID, a, checkedItems, setCheckedItems }) {
    const docRef = dbDoc(dbService, userUID.toString(), a.id);

    const checkedItemHandler = async(id, isChecked) => {
        console.log(!isChecked && checkedItems.has(id));
        if (isChecked) {
            console.log("check");
            checkedItems.add(id);
            setCheckedItems(checkedItems);
            await dbUpdataDoc(docRef, {isChecked: true});
            console.log(a.isChecked);
        } else if (!isChecked && checkedItems.has(id)) {
            console.log("uncheck");
            checkedItems.delete(id);
            setCheckedItems(checkedItems);
            await dbUpdataDoc(docRef, {isChecked: false});
            console.log(a.isChecked);
        }
    };
    const checkHandler = (id, { target }) => {
        checkedItemHandler(id, target.checked);
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