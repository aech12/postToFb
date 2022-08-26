import "./styles.css";
import { useState, useEffect, useCallback } from "react";
import { useInitFbSDK } from "./fb-hooks";

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

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <button onClick={logInToFB} className="btn confirm-btn">
        Login with Facebook
      </button>
    </div>
  );
}
