import { useEffect, useRef } from "react";
import "../styles/cursor.css"; // Ensure you have CSS for cursor and cursor2
import gsap from "gsap";

function Cursor() {
  const cursorRef = useRef(null);
  const cursorInnerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorinner = cursorInnerRef.current;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      cursor.style.transform = `translate3d(${x - cursor.offsetWidth / 2}px, ${y - cursor.offsetHeight / 2}px, 0)`;
      cursorinner.style.left = `${x}px`;
      cursorinner.style.top = `${y}px`;
    };

    const handleMouseDown = () => {
      cursor.classList.add("click");
      cursorinner.classList.add("cursorinnerhover");
    };

    const handleMouseUp = () => {
      cursor.classList.remove("click");
      cursorinner.classList.remove("cursorinnerhover");
    };

    const handleMouseOver = () => {
      cursor.classList.add("hover");
    };

    const handleMouseLeave = () => {
      cursor.classList.remove("hover");
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Handle mouse over/leave for anchor tags
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("mouseover", handleMouseOver);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      links.forEach((link) => {
        link.removeEventListener("mouseover", handleMouseOver);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={cursorInnerRef} className="cursor2"></div>
    </>
  );
}

export default Cursor;
