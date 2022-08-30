import "./styles.css";
import { useState, useEffect, useCallback, useRef } from "react";

export default function App({ props }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    //Our first draw
    context.fillStyle = "#e8d1de";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  const getJpg = () => {
    var dataURL = canvasRef.current.toDataURL("image/jpeg");
    console.log("url", dataURL);
  };

  return (
    <div>
      <canvas ref={canvasRef} {...props} />
      <button onClick={() => getJpg()}>Get JPG</button>
      {/* <img src="" /> */}
    </div>
  );
}
