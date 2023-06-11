import { Navigate } from "react-router-dom";

export default function ProtectedRouteElement({ element: Component, ...props }) {
  if(!props.loaded){
    return (<h1>Loading...</h1>)
  }
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
  )
};

