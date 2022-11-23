import Link from "next/link";
//items aren't actually moved here yet

export default function Completed() {
    return (
        <div>
            <h1>Completed Items</h1>
            <ul>

            </ul>

            <br />
            <Link href="/">Back to todo list</Link>
        </div>
    );
}