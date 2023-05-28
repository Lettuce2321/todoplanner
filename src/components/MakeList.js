import React, { useState } from "react";
import {dbService, dbAddDoc, dbCollection} from "../fbase"

function MakeList({userUID}) {

    let [toDoSection, setToDoSection] = useState("");

    const onChange = (e) => {
        let {target: {value}} = e;
        setToDoSection(value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();

        const userList = {
            text: toDoSection,
            createAt: Date.now(),
            createId: userUID,
            isChecked: false
        }
        
        await dbAddDoc(dbCollection(dbService, userUID.toString()), userList);
        setToDoSection("");
    }

    return (
        <form onSubmit={onSubmit}>
            <input
            type="text"
            name="todo"
            value={toDoSection}
            placeholder="Write what you have to do!"
            onChange={onChange}
            required />
            <input
            type="submit"
            value="check"
            />
        </form>
    )
}

export default MakeList;