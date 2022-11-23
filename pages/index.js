import Link from "next/link";

export default function Index() {
    const items = [
        {id: 1, action: 'Carve the pumpkin'},
        {id: 2, action: 'Buy Candy'},
        {id: 3, action: 'Brainstorm costume ideas'}
    ];

    function onSubmit(event) {
        event.preventDefault();
        let todo = document.createElement("li");
        todo.innerHTML = document.getElementById("NewToDo").value;
        document.getElementById("ToDo").appendChild(todo);
    }
    
    function removeSelf(event) {
        event.target.parentNode.removeChild(event.target);
    }

    return (
    <div>
        <h1>Todo</h1>
        <ul id="ToDo" onClick={(event) => removeSelf(event)}>
            {items.map((item) => <li id={item.id}>{item.action}</li>)}
        </ul>
        Add items using the form below, remove items by clicking on them.
        <form onSubmit={onSubmit}>
            <label for="NewToDo">Enter the new todo here:</label>
            <br />
            <input type="text" id="NewToDo" name="NewToDo"></input>
            <input type="submit" value="submit"></input>
        </form>

        <br />
        <Link href="/completed">Completed items</Link>
    </div>
    );
}