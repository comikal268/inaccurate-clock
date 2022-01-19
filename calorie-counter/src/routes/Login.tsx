import { FormEvent } from 'react';
import { useProvideAuth } from '../providers/authProvider';

export default function Login() {
    let token: string = '';
    const auth = useProvideAuth();
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        await (auth.signin(token));
    };

    const handleChange = (event: any) => {
        token = event.target.value;
    };
    return (<>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Token:
                <input type="text" defaultValue={token} onChange={handleChange}/>
            </label>
            <input type="submit" value="Submit" />
        </form>
    </>);
}
