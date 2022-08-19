import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);
  const { signIn, signInGoogleAuth, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    if (!user.email) {
      setAlert({
        message: "Por favor ingresa tu correo",
        type: "error",
      });
      return;
    }
    try {
      await signIn(user.email, user.password);
      navigate("/");
    } catch (error) {
      setAlert({
        message: error.message,
        type: "error",
      });
      if (error.code === "auth/weak-password") {
        setAlert({
          message: "La contraseña debe ser de almenos 6 caracteres",
          type: "error",
        });
      }
    }
  };

  const googleSignIn = async () => {
    setAlert(null);
    try {
      await signInGoogleAuth();
      navigate("/");
    } catch (error) {
      setAlert({
        message: error.message,
        type: "error",
      });
      if (error.code === "auth/popup-closed-by-user") {
        setAlert({
          message: "Se cerró la ventana de inicio de google",
          type: "error",
        });
      }
    }
  };

  const handleResetPassword = async () => {
    setAlert(null);
    if (!user.email) {
      setAlert({
        message: "Por favor ingresa tu correo",
        type: "error",
      });
      return;
    }
    try {
      await resetPassword(user.email);
      setAlert({
        message:
          "Se envio la solicitud de cambio de contraseña, por favor revisa tu correo",
        type: "success",
      });
    } catch (error) {
      if (error.mesasge === "auth/missing-email")
        setAlert({
          message: "Por favor ingresa tu correo",
          type: "success",
        });

      setAlert({
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div className="bg-stone-300 text-black h-screen flex">
      <div className="w-full max-w-xs m-auto ">
        {alert && <Alert message={alert.message} typeAlert={alert.type} />}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Correo
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="ingresa tu correo"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="*************"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Ingresar
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#!"
              onClick={handleResetPassword}
            >
              Cambiar contraseña
            </a>
          </div>
        </form>
        <div className="mb-2">
          <p>Ingresa con tu cuenta:</p>
        </div>
        <button
          onClick={googleSignIn}
          className="bg-slate-50 hover:bg-slate-200 text-black  shadow rounded border-2 border-gray-300 py-2 px-28 w-full text-center  items-center inline-flex"
          type="button"
        >
          <img
            alt="google"
            className="w-5 mr-1"
            src={require("../assets/img/google.svg").default}
          />
          Google
        </button>
        <p className="my-4 text-sm flex justify-between px-3">
          Create una cuenta
          <Link to="/register" className="text-blue-700 hover:text-blue-900">
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
