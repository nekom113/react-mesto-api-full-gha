import { Link } from "react-router-dom";
import auth from "../utils/auth";
import AuthForm from "./AuthForm";

export default function Register({ navigate, setUserEmail, onInfoTooltipOpen }) {
  const handleRegistrationUser = (userData) => {
    auth.getRegistrationUser(userData)
      .then(data => {
        navigate("/sign-in");
        setUserEmail(data.email)
        onInfoTooltipOpen({ isOpen: true, status: true })
      })
      .catch(() => onInfoTooltipOpen({ isOpen: true, status: false }))
  }
  return (
    <AuthForm title='Регистрация' buttonText='Зарегистрироваться' handleOnSubmit={handleRegistrationUser}>
      <p className="auth-form__text">
        Уже зарегистрированы?
        <Link to="/" className="auth-form__link"> Войти </Link>
      </p>
    </AuthForm>
  )
}

