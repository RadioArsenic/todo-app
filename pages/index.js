import { useReducer, useState } from "react";
import { nanoid } from "nanoid";
import { ImBin } from 'react-icons/im';

//originalItems is not being updated

export default function Index() {
    const [completeStatus, setCompleteStatus] = useState(false);

    const OriginalItems = [
        {id: `${nanoid()}`, action: 'Carve the pumpkin', isComplete: false},
        {id: `${nanoid()}`, action: 'Buy candy', isComplete: false},
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
    <div className="flex flex-col flex-wrap place-content-center items-center h-screen lg:h-3/6">
        <div className="flex flex-col flex-wrap items-center h-max lg:mt-12 w-fit p-2  pt-6 pb-8 bg-neutral-900 rounded-3xl shadow-md shadow-orange-400/50">
            <h1 className="mb-3 mx-3 text-3xl font-bold text-orange-500">Todo</h1>

            <div className="my-1 mx-3">
            <button className="bg-amber-600 rounded-full px-2 py-0.5 shadow-md focus:shadow-amber-600/50 hover:shadow-amber-600/50" onClick={() => setCompleteStatus(true)}>Show Complete</button>
            <button className="ml-1 bg-amber-600 rounded-full px-2 py-0.5 shadow-md focus:shadow-amber-600/50 hover:shadow-amber-600/50" onClick={() => setCompleteStatus(false)}>Show Uncomplete</button>
            </div>

            <div className="my-1 mx-3">
            {items.filter((item) => item.isComplete === completeStatus).map((item) => (
                <div key={item.id}>
                    <label>
                        <input className="mx-3" type="checkbox" checked={item.isComplete} onChange={() => Completed(item)} />
                        {item.action}
                    </label>
                    <button className="ml-2 align-[-3px]" onClick={() => Deleted(item)}><ImBin /></button>
                </div>
            ))}
            </div>

            <form className="my-1 mx-3" onSubmit={onSubmit}>
                <label htmlFor="NewToDo">Enter new items here:</label>
                <br />
                <input className="mt-1" type="text" id="NewToDo" name="NewToDo"></input>
                <input className="ml-2 align-top bg-amber-600 rounded-full px-2 py-0.5 shadow-md focus:shadow-amber-600/50 hover:shadow-amber-600/50" type="submit" value="submit"></input>
            </form>
        </div>
    </div>
    );
}