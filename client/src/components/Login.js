import React from "react";

import { GoogleLogin } from "react-google-login";
// refresh token
import { refreshTokenSetup } from "../util/refreshToken";

import { useNavigate } from "react-router-dom";
import {inMemoryUserManager} from "../util/fetcher";

function Login() {
  const navigate = useNavigate();

  const OnSuccess = (res) => {
    inMemoryUserManager.setUser(res);
    refreshTokenSetup(res);
    navigate("/jobs");
  };



  const OnFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(
      "Failed to login."
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={"980011737294-kriddo55g39bja7timpfk233lm83l8jl.apps.googleusercontent.com"}
        buttonText="Login"
        onSuccess={OnSuccess}
        onFailure={OnFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
