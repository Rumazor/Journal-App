import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/UseForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { setError, removeError } from "../../actions/ui";
import { startRegisterWithEmailPassword } from "../../actions/auth";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log("Formulario Correcto");
      dispatch(startRegisterWithEmailPassword(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("El nombre es requerido."));
      return false;
    }
    //
    else if (!validator.isEmail(email)) {
      dispatch(setError("El email no es valido."));
      return false;
    }
    //
    else if (password !== confirmPassword || password.length < 5) {
      dispatch(
        setError(
          "Contraseña deberia tener al menos 6 caracteres y deben coincidir."
        )
      );

      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Registro</h3>
      <form
        className="animate__animated animate__fadeIn animate_faster"
        onSubmit={handleRegister}
      >
        {msgError && <div className="auth__alert-error">{msgError}</div>}

        <input
          type="text"
          placeholder="Nombre"
          className="auth__input"
          autoComplete="off"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Correo electrónico"
          className="auth__input"
          autoComplete="off"
          name="email"
          onChange={handleInputChange}
          value={email}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="auth__input"
          name="password"
          onChange={handleInputChange}
          value={password}
        />
        <input
          type="password"
          placeholder="Confirma contraseña"
          className="auth__input"
          name="confirmPassword"
          onChange={handleInputChange}
          value={confirmPassword}
        />
        <button className="btn btn-primary btn-block" type="submit">
          Registrarse
        </button>

        <div className="auth__social-networks">
          <p className="mt-5">
            ¿Ya tienes una cuenta?{" "}
            <Link className="mt-5 link" to="/auth/login">
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};
