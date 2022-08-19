import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);

  const { signup } = useAuth();
  const navigate = useNavigate();

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
      await signup(user.email, user.password);
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

  return (
    <div className="bg-stone-300 text-black h-screen flex">
      <div className="w-full max-w-xs m-auto text-black">
        {alert && <Alert message={alert.message} typeAlert={alert.type} />}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4"
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
              onChange={(e) => setUser({ ...user, email: e.target.value })}
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="*************"
            />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Registrarse
          </button>
        </form>
        <p className="my-4 text-sm flex justify-between px-3">
          Ya tienes una cuenta?
          <Link to="/login" className="text-blue-700 hover:text-blue-900">
            Ingresar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
