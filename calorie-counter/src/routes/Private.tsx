import {Navigate, Outlet} from "react-router-dom";
import useAuth from "../providers/authProvider";

export default function Private() {
  return (<>
      <h1>Private</h1>
  </>  );
}

export function PrivateOutlet() {
    const auth = useAuth();
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export function PrivateRoute({ children }: {children: any}) {
    const auth = useAuth();
    return auth ? children : <Navigate to="/login" />;
}