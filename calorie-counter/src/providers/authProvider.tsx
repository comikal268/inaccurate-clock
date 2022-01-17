import {AuthContext, AuthContextInterface} from "../App";
import {useContext} from "react";

export default function useAuth() {
    const {isAuthenticated} = useContext(AuthContext);
    return isAuthenticated;
}

export const initialState: AuthContextInterface = {
    isAuthenticated: false,
    user: null,
    token: null,
};

export const loginReducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
};