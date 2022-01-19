import {Navigate, Outlet} from "react-router-dom";
import CRUDTable from '../components/CRUDTable';
import useAuth from "../providers/authProvider";

export default function Private() {
  return (<>
      <h1>Entries</h1>
      <CRUDTable/>
  </>  );
}

export function PrivateOutlet() {
    const auth = useAuth();
    // return auth.user.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
     return auth ? <Outlet /> : <Navigate to="/login" />;
}
