import "./styles.css";
import { useState, useEffect, useCallback } from "react";
import { useInitFbSDK } from "./fb-hooks";
import Canvas from "./CanvasComponent";

import * as data from "./data";

export default function App() {
  const [fbUserAccessToken, setFbUserAccessToken] = useState();

  // Initializes the Facebook SDK
  const isFbSDKInitialized = useInitFbSDK();

  // Checks if the user is logged in to Facebook
  useEffect(() => {
    if (isFbSDKInitialized) {
      window.FB.getLoginStatus((response) => {
        setFbUserAccessToken(response.authResponse?.accessToken);
      });
      // res :
      // status: 'connected',
      // authResponse: {
      //     accessToken: '...',
      //     expiresIn:'...',
      //     signedRequest:'...',
      //     userID:'...'
      // }
    }
  }, [isFbSDKInitialized]);

  const logInToFB = useCallback(() => {
    window.FB.login((response) => {
      setFbUserAccessToken(response.authResponse.accessToken);
    });
  }, []);

  const shareOnFb = async () => {
    const canvasBlobFromBase64 = await fetch(data.jpg)
      .then((res) => res.blob())
      .then(console.log);

    // const fileReader = new FileReader();
    // fileReader.onloadend = async () => {
    const photoData = canvasBlobFromBase64;
    const formData = new FormData();

    formData.append("access_token", fbUserAccessToken);
    formData.append("source", photoData);
    formData.append("message", "some status message");

    let response = await fetch(`https://graph.facebook.com/me/photos`, {
      body: formData,
      method: "post"
    });
    response = await response.json();
    console.log("post response", response);
    // };
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <p>FB status: {fbUserAccessToken}</p>
      <button onClick={logInToFB} className="btn confirm-btn">
        Login with Facebook
      </button>
      <Canvas />
      <button onClick={() => shareOnFb()}>Share on FB</button>
    </div>
  );
}
