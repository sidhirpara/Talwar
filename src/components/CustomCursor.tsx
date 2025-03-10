import { useEffect } from "react";
import "../styles/CustomCursor.css"; // Adjust the path if needed

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor") as HTMLElement | null;

    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    const addSprayEffect = () => cursor?.classList.add("spray");
    const removeSprayEffect = () => cursor?.classList.remove("spray");

    document.addEventListener("mousemove", moveCursor);
    document.querySelectorAll("a, button").forEach((element) => {
      element.addEventListener("mouseenter", addSprayEffect);
      element.addEventListener("mouseleave", removeSprayEffect);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("a, button").forEach((element) => {
        element.removeEventListener("mouseenter", addSprayEffect);
        element.removeEventListener("mouseleave", removeSprayEffect);
      });
    };
  }, []);

  return <div className="custom-cursor"></div>;
};

export default CustomCursor;
