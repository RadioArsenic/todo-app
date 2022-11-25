import { useReducer, useState } from "react";
import { nanoid } from "nanoid";
import { ImBin } from 'react-icons/im';

//TODO: make pretty :)
//TODO: local storage (tasks are preserved even after refreshing the page)

//originalItems is not being updated

export default function Index() {
    const [completeStatus, setCompleteStatus] = useState(false);

    const OriginalItems = [
        {id: `${nanoid()}`, action: 'Carve the pumpkin', isComplete: false},
        {id: `${nanoid()}`, action: 'Buy candy', isComplete: false},
        {id: `${nanoid()}`, action: 'Brainstorm costume ideas', isComplete: false}
    ];

    const boxStyle = {
        display: "flex",
        justifyContent: "center",
        flexFlow: "column wrap",
        alignContent: "center",
        alignItems: "center"
    };

    const separate = {
        margin: "1% 8%"
    };

    function onSubmit(event) {
        event.preventDefault();
        //add to object array
        let todoAction = document.getElementById("NewToDo").value;
        let newId = nanoid();
        items.push({id: newId, action: todoAction, isComplete: false});
        dispatch({ type: "ADD", id: newId });
    }
    
    function reducer(state, action) {
        switch (action.type) {
        case 'ADD':
            return state.map((item) => {
                return item;
            });
        case 'COMPLETE':
            return state.map((item) => {
                if (item.id === action.id) {
                    return { ...item, isComplete: !item.isComplete };
                }
                else {
                    return item;
                }
            });
        case 'DELETE':
            return state.filter((item) => item.id !== action.id);
        default:
            return state;
        }
    }

    const [items, dispatch] = useReducer(reducer, OriginalItems);

    function Completed(item) {
        dispatch({ type: "COMPLETE", id: item.id });
    }

    function Deleted(item) {
        dispatch({ type: "DELETE", id: item.id });
    }

    return (
    <div style={boxStyle}>
        <h1 style={separate}>Todo</h1>

        <div style={separate}>
        <button onClick={() => setCompleteStatus(false)}>Show Uncomplete</button>
        <button style={{marginLeft: "4px"}} onClick={() => setCompleteStatus(true)}>Show Complete</button>
        </div>

        <div style={separate}>
        {items.filter((item) => item.isComplete === completeStatus).map((item) => (
            <div key={item.id}>
                <label>
                    <input type="checkbox" checked={item.isComplete} onChange={() => Completed(item)} />
                    {item.action}
                </label>
                <button style={{marginLeft: "7px"}} onClick={() => Deleted(item)}><ImBin /></button>
            </div>
        ))}
        </div>

        <form style={separate} onSubmit={onSubmit}>
            <label htmlFor="NewToDo">Enter new items here:</label>
            <br />
            <input type="text" id="NewToDo" name="NewToDo"></input>
            <input type="submit" value="submit"></input>
        </form>
    </div>
    );
}