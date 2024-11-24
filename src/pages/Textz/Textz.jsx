import { useState } from "react";
import "./Textz.scss";
import data from "./phases.json";
import getRandomInt from "../../util/getRandomInt";
import { useEffect } from "react";
import adjustFontSize from "../../util/dynamicFontSize";

function Textz() {
  const [phaseId, setPhaseId] = useState(0);
  const [phase, setPhase] = useState(data.phases[phaseId]);

  useEffect(() => {
    setPhase(data.phases[phaseId]);
  }, [phaseId]);

  function navigate(direction) {
    switch (direction) {
      case "left":
        if (phaseId - 1 < 0) setPhaseId(data.phases.length - 1);
        else setPhaseId(phaseId - 1);
        break;
      case "right":
        if (phaseId + 1 > data.phases.length - 1) setPhaseId(0);
        else {
          setPhaseId(phaseId + 1);
        }
        break;
    }
  }

  return (
    <>
      <div className="textz-container">
        <img className="textz-img" src="her.webp" />
        <div className="textz-wrapper">
          {[...Array(3)].map((x, i) => (
            <>
              <span className="textz-star" style={{ top: getRandomInt(), left: getRandomInt() }}>
                ★
              </span>
              <span className="textz-star" style={{ top: getRandomInt(), right: getRandomInt() }}>
                ★
              </span>
              <span
                className="textz-star"
                style={{ bottom: getRandomInt(), right: getRandomInt() }}>
                ★
              </span>
              <span className="textz-star" style={{ bottom: getRandomInt(), left: getRandomInt() }}>
                ★
              </span>
            </>
          ))}
          <div className="text-wrapper">
            <p className="text" style={{ fontSize: adjustFontSize(phase.string, 0.4, 1, 0.0065) }}>
              {phase.string}
            </p>
            <p className="text-timestamp">Posted on {phase.date}</p>
          </div>
        </div>
        <div className="text-navigator">
          <button
            className="text-navigate text-navigate--left"
            onClick={() => {
              navigate("left");
            }}>
            ↫
          </button>
          <p className="text-emblem">𖤓</p>
          <button
            className="text-navigate text-navigate--right"
            onClick={() => {
              navigate("right");
            }}>
            ↬
          </button>
        </div>
      </div>
    </>
  );
}

export default Textz;