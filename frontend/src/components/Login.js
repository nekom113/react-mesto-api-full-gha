import auth from "../utils/auth";
import AuthForm from "./AuthForm";

export default function Login({ setUserEmail, setLoggedIn, navigate, onInfoTooltipOpen }) {
  function handleAuthorizationUser(userData) {
    console.log({userData});
    auth.getAuthorizationUser(userData)
      .then(data => {
        console.log({data});
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setUserEmail(userData.email)
          navigate("/");
        }
      })
      .catch(() => onInfoTooltipOpen({ isOpen: true, status: false }))
  }

  return (
    <AuthForm title='Вход' buttonText='Войти' handleOnSubmit={handleAuthorizationUser} />
  )
}

