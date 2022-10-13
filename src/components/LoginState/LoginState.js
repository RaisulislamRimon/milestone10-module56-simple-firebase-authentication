import React, { useState } from "react";

const LoginState = () => {
  const [loggedInUser, setLoggedInUser] = useState(true);
  return (
    <div>{loggedInUser ? <button>LogOut</button> : <button>Login</button>}</div>
  );
};

export default LoginState;
