import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { Ring } from "@uiball/loaders";

import {
  startGoogleLogin,
  startLoginEmailPassword,
  startTwitterLogin,
  startFacebookLogin,
} from "../../actions/auth";
import { setError, removeError } from "../../actions/ui";
import { useForm } from "../../hooks/UseForm";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);
  const { loading } = useSelector((state) => state.ui);
  console.log(loading);

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });
  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginIsValid) {
      // aqui va el navigate
      return console.log("Formulario Correcto");
    }
    dispatch(startLoginEmailPassword(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };
  const handleTwitterLogin = () => {
    dispatch(startTwitterLogin());
  };
  const handleFacebookLogin = () => {
    dispatch(startFacebookLogin());
  };

  const loginIsValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError("El email no es valido."));
      return false;
    }
    //
    else if (password.length < 5) {
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
      <h3 className="auth__title">Inicia sesión</h3>
      <form onSubmit={handleLogin}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          placeholder="Correo electrónico"
          className="auth__input"
          autoComplete="off"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="auth__input"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-primary btn-block"
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <Ring size={18} lineWeight={5} speed={2} color="white" />
          ) : (
            "Inicia sesión"
          )}
        </button>

        <div className="auth__social-networks  mt-1">
          <p>Inicia sesión con</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper ">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Ingresa con Google</b>
            </p>
          </div>
          <div className="google-btn" onClick={handleTwitterLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Ingresa con Twitter</b>
            </p>
          </div>
          <div className="google-btn" onClick={handleFacebookLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Ingresa con Facebook</b>
            </p>
          </div>
          <p className="mt-5">
            ¿No tienes cuenta?{" "}
            <Link className="mt-5 link" to="/auth/register">
              Regístrate
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};
