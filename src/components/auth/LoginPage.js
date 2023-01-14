import React from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <>
      <h3 className="auth__title">Ingresar</h3>
      <form>
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
        <button className="btn btn-primary btn-block" type="submit">
          Ingresar
        </button>

        <div className="auth__social-networks">
          <p>Login with social</p>
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
