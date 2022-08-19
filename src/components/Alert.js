import React from "react";

const Alert = ({ message, typeAlert }) => {
  let content;
  if (typeAlert=== 'success') {
    content = (
      <div
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2 text-center"
        role="alert"
      >
        <span className="sm:inline-block"> {message}</span>
      </div>
    );


  } else if(typeAlert=== 'error') {
    content = 
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2 text-center"
      role="alert"
    >
      <span className="sm:inline-block"> {message}</span>
    </div>
  }
  return <>{content}</>;
};

export default Alert;
