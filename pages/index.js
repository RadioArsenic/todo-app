import { useReducer, useState } from "react";
import { nanoid } from "nanoid";
import { ImBin } from 'react-icons/im';

//TODO: react -> next.js
//TODO: make pretty :)
//TODO: local storage (tasks are preserved even after refreshing the page)

//originalitems is not being updated

export default function Index() {
    const [completeStatus, setCompleteStatus] = useState(false);

    const OriginalItems = [
        {id: `${nanoid()}`, action: 'Carve the pumpkin', isComplete: false},
        {id: `${nanoid()}`, action: 'Buy Candy', isComplete: false},
        {id: `${nanoid()}`, action: 'Brainstorm costume ideas', isComplete: false}
    ];

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
    <div>
        <h1>Todo</h1>
        <button onClick={() => setCompleteStatus(false)}>Show Uncomplete</button>
        <button onClick={() => setCompleteStatus(true)}>Show Complete</button>

        {items.filter((item) => item.isComplete == completeStatus).map((item) => (
            <div key={item.id}>
                <label>
                    <input type="checkbox" checked={item.isComplete} onChange={() => Completed(item)} />
                    {item.action}
                </label>
                <button onClick={() => Deleted(item)}><ImBin /></button>
            </div>
        ))}

        Add items using the form below, remove items by clicking on them.
        <form onSubmit={onSubmit}>
            <label htmlFor="NewToDo">Enter the new todo here:</label>
            <br />
            <input type="text" id="NewToDo" name="NewToDo"></input>
            <input type="submit" value="submit"></input>
        </form>
    </div>
    );
}