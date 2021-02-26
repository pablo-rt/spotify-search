import React from "react";

const Login = () => {
  

  const stfLogin = async () => {
    const app_client_id = "24ba0e3550394ba5b137a1fe52cf8d98";
    const redirect_uri = "http://localhost:3000/";
    const url = "https://accounts.spotify.com/authorize";

    const authEndPoint = `${url}?client_id=${app_client_id}&redirect_uri=${redirect_uri}&response_type=token&show_dialog=true`;
    window.location.href = authEndPoint;

    
  };

  return (
    
    <input
    type="submit"
    className="btn btn-lg btn-success btn-block rounded-lg"
    value="Login"
    onClick={stfLogin}></input>
  );
};

export default Login;
