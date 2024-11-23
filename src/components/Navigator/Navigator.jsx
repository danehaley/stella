import { useState } from "react";
import "./Navigator.scss";

function Navigator() {
  const [text, setText] = useState("i love you to death");
  return (
    <>
      <div>
        <p>{text}</p>
      </div>
      <div>
        <button></button>
        <button></button>
        <button></button>
      </div>
    </>
  );
}

export default Navigator;
