import { useRef, useEffect, useState } from "react";
import Colors from "../../constants/Colors";

const Root = ({ width = 0, height = 50, lineWidth = 3, active = false }) => {
  const canvas = useRef(null);
  const [focus, setFocus] = useState(false);

  const draw = () => {
    const context = canvas.current.getContext("2d");
    context.strokeStyle = active || focus ? Colors.primary : "#fff";
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(0, height / 3 + 20);
    context.bezierCurveTo(
      width / 3,
      height / 6,
      (2 * width) / 3,
      height / 6,
      width,
      height / 3 + 20
    );
    context.stroke();
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

export default Root;
