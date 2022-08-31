import "./styles.css";
import { useState, useEffect, useCallback } from "react";
import { useInitFbSDK } from "./fb-hooks";
import Canvas from "./CanvasComponent";

import * as data from "./data";

export default function App() {
  const [fbUserAccessToken, setFbUserAccessToken] = useState();
  const [fbAvailability, setFbAvailability] = useState();

  // Initializes the Facebook SDK
  const isFbSDKInitialized = useInitFbSDK();

  // Checks if the user is logged in to Facebook
  useEffect(() => {
    if (isFbSDKInitialized) {
      window.FB.getLoginStatus((response) => {
        setFbUserAccessToken(response.authResponse?.accessToken);
        setFbAvailability(response?.status);
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
    // convert jpg base 64 to Blob
    const canvasBlobFromBase64 = await fetch(data.jpg).then((res) =>
      res.blob()
    );
    console.log("canvas", canvasBlobFromBase64);
    const formData = new FormData();
    formData.append("access_token", fbUserAccessToken);
    formData.append("source", canvasBlobFromBase64);
    formData.append("message", "some status message");

    // post form-data to user's photos
    let response = await fetch(`https://graph.facebook.com/me/photos`, {
      body: formData,
      method: "post"
    });
    response = await response.json();
    console.log("post response", response);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox 0.301</h1>
      <p>
        FB status:{fbAvailability} {fbUserAccessToken}
      </p>
      <button onClick={logInToFB} className="btn confirm-btn">
        Login with Facebook
      </button>
      <Canvas />
      <button onClick={() => shareOnFb()}>Share on FB</button>
    </div>
  );
}
