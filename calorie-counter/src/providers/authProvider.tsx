import { createContext, useContext, useState } from 'react';


export interface AuthContextInterface {
    user: any,
    isAuthenticated?: boolean,
    token?: string
}
export const AuthContext = createContext({} as AuthContextInterface );
export default function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
export const initialState: AuthContextInterface = {
    user: 1,
    isAuthenticated: true
};

export function useProvideAuth() {
    const [user, setUser] = useState(initialState);

    const signin = async (token: string) => {
        const result = await fetch(`/api/login`, {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token})
        });
        if (result.status === 200) {
            const {user_id, token} = await result.json() as any;
            console.log("signed in");
            setUser({isAuthenticated: true, user: user_id, token});
        }
    };

    const signout = async () => {
        console.log("signed out");
        setUser({isAuthenticated: false, user: null, token: undefined});
    };

    return {
        user,
        signin,
        signout
    };
}
