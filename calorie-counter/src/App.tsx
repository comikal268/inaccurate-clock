import {
    BrowserRouter,
} from "react-router-dom";
import RouterConfig from "./routes/RouterConfig";
import TopNav from "./nav/TopNav";
import {  AuthContext, useProvideAuth } from './providers/authProvider';


export default function App() {
    const auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>
            <BrowserRouter>
                <TopNav />
                <RouterConfig/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}


