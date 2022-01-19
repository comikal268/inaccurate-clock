import {Route, Routes} from "react-router-dom";
import Login from "./Login";
import Private, {PrivateOutlet} from "./Private";
import Public from "./Public";
export default function RouterConfig() {
    return (
    <Routes>
        <Route path="/" element={<Public/>}/>
        <Route path="/private-outlet" element={<PrivateOutlet/>}>
            <Route path="" element={<Private/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
    </Routes>);
}
