import React from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <>
      <h3 className="auth__title">Registro</h3>
      <form>
        <input
          type="text"
          placeholder="Nombre"
          className="auth__input"
          autoComplete="off"
          name="name"
        />
        <input
          type="text"
          placeholder="Correo electrónico"
          className="auth__input"
          autoComplete="off"
          name="email"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="auth__input"
          name="password"
        />
        <input
          type="password"
          placeholder="Confirma contraseña"
          className="auth__input"
          name="confirm"
        />
        <button className="btn btn-primary btn-block" type="submit">
          Registrarse
        </button>

        <div className="auth__social-networks">
          <p>Registrate con google</p>
          <div className="google-btn">
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
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
