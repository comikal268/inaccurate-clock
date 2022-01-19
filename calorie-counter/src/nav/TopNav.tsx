import {Link} from "react-router-dom";
import { useProvideAuth } from '../providers/authProvider';

export default function TopNav() {
    const auth = useProvideAuth();

    const handleLogout = async (event: any) => {
        event.preventDefault();
        await auth.signout();
    }
    return (
        <nav>
            <Link to="/">Public</Link>
            {" | "}
            <Link to="/private-outlet">Private Using Outlet</Link>
            {" | "}
            <Link to="/logout" onClick={handleLogout}>Signout</Link>
        </nav>
    );
}
