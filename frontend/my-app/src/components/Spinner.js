import React from "react";

function Spinner() {
  return (
    <div className="fixed inset-0  bg-dark z-10 flex items-center justify-center opacity-70">
      <lottie-player
        src="https://assets7.lottiefiles.com/packages/lf20_f1dhzsnx.json"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "300px" }}
        loop
        autoplay
      ></lottie-player>
    </div>
  );
}

export default Spinner;
