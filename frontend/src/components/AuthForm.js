import { useState } from "react";

export default function AuthForm({ title, buttonText, handleOnSubmit, children }) {
  const [values, setValues] = useState({
    'password': '',
    'email': ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setValues((prevValue) => ({ ...prevValue, [name]: value }))
  }


  const handleOnSubmitForm = (e) => {
    e.preventDefault();
    handleOnSubmit(values)
  }
  return (
    <section className="auth-form">
      <h2 className="auth-form__title">{title}</h2>
      <form onSubmit={handleOnSubmitForm}>
        <input type="email" name="email" className="auth-form__input" placeholder="Email" onChange={handleChange} value={values.email} required />
        <input type="password" name="password" className="auth-form__input" placeholder="Пароль" minLength="2" maxLength="30" value={values.password} onChange={handleChange} required />
        <button type="submit" className="auth-form__save-button"> {buttonText} </button>
      </form>
      {children}
    </section>
  )
}
