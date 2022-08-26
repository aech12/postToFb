import React from "react";

const FB_APPID = "1475943276185400";
const FB_API_VERSION = "v14.0";

// Injects the Facebook SDK into the page
const injectFbSDKScript = () => {
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};

export const useInitFbSDK = () => {
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Initializes the SDK once the script has been loaded
  // https://developers.facebook.com/docs/javascript/quickstart/#loading
  window.fbAsyncInit = function () {
    window.FB.init({
      // Find your App ID on https://developers.facebook.com/apps/
      appId: FB_APPID,
      cookie: true,
      xfbml: true,
      version: FB_API_VERSION
    });

    window.FB.AppEvents.logPageView();
    setIsInitialized(true);
  };

  injectFbSDKScript();

  return isInitialized;
};
