import { useState, useEffect, useCallback, useMemo } from "react";
import useLaptopStore from "../store/laptopStore";

const useCursor = () => {
  const laptop = useLaptopStore(state => state.laptop);

  const [hovered, setHovered] = useState(false);
  const tooltip = useMemo(() => document.getElementById("tooltip"), []);
  const [balloon, text] = useMemo(() => [tooltip?.children[0], tooltip?.children[1]], [tooltip]);

  const changeColor = (el, attr, color) => {
    if (el) el.style[attr] = color;
  };

  const pointerOver = () => setHovered(true);
  const pointerOut = () => setHovered(false);

  const switchingCursor = useCallback(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
  }, [hovered]);

  const switchingTooltip = useCallback(
    show => {
      if (!tooltip || !balloon || !text) return;
      changeColor(tooltip, "backgroundColor", `rgba(0,0,0,${show ? 0.8 : 0})`);
      changeColor(balloon, "borderTop", `5px solid rgba(0,0,0,${show ? 0.8 : 0})`);
      changeColor(balloon, "borderRight", `5px solid rgba(0,0,0,${show ? 0.8 : 0})`);
      changeColor(text, "color", `rgba(255,255,255,${show ? 1 : 0})`);
    },
    [balloon, text, tooltip]
  );

  const pointerMove = useCallback(
    e => {
      if (!laptop && tooltip) {
        tooltip.style.top = `${e.clientY + 10}px`;
        tooltip.style.left = `${e.clientX + 25}px`;
        switchingTooltip(hovered);
      }
      switchingCursor();
    },
    [hovered, laptop, switchingCursor, switchingTooltip, tooltip]
  );

  useEffect(() => {
    switchingTooltip(!laptop);
  }, [laptop, switchingTooltip]);

  useEffect(() => {
    document.addEventListener("mousemove", pointerMove);
    return () => document.removeEventListener("mousemove", pointerMove);
  }, [hovered, pointerMove]);

  return { pointerOver, pointerOut };
};

export default useCursor;
