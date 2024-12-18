import { useState } from "react";
import "./Feedback.scss";

function Feedback() {
  const [text, setText] = useState("feedback");
  const doshit = () => {
    setText("disabled");
    setTimeout(function () {
      setText("feedback");
    }, 1000);
  };
  return (
    <div className="feedback-wrapper">
      <button onClick={doshit}> {text} </button>
    </div>
  );
}

export default Feedback;
