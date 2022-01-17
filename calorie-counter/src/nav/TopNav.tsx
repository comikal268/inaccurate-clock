import {Link} from "react-router-dom";

export default function TopNav() {
    return (
        <nav>
            <Link to="/">Public</Link>
            {" | "}
            <Link to="/private-nested">Private Using Nested</Link>
            {" | "}
            <Link to="/private-outlet">Private Using Outlet</Link>
        </nav>
    );
}