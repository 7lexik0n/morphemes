import { useRef, useEffect, useState } from "react";
import Colors from "../../constants/Colors";

const Suffix = ({ width = 0, height = 50, lineWidth = 3, active = false }) => {
  const canvas = useRef(null);
  const [focus, setFocus] = useState(false);

  const draw = () => {
    const context = canvas.current.getContext("2d");
    context.beginPath();
    context.strokeStyle = active || focus ? Colors.primary : "#fff";
    context.lineWidth = lineWidth;
    context.moveTo(0, 0);
    context.strokeRect(0, 0, width, height);
  };

  useEffect(draw, [draw, width, height, active]);

  return (
    <canvas
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
      ref={canvas}
      width={width}
      height={height}
    ></canvas>
  );
};

export default Suffix;
