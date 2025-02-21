import { useEffect, useRef } from "react";
import gsap from "gsap";
import '../styles/FriesAnimation.css';

const FriesAnimations = () => {
    const containerRef = useRef(null);
    const friesCount = 80;  // Total number of fries
    const screenWidth = window.innerWidth;  // Width of the window
    const screenHeight = window.innerHeight;  // Height of the window

    useEffect(() => {
        gsap.set("#friesAnimationContainer", { perspective: 600 });
        gsap.set("img", { xPercent: "0%", yPercent: "0%" });

        for (let i = 0; i < friesCount; i++) {
            const fryElement = document.createElement("div");
            gsap.set(fryElement, {
                attr: { class: "fries" },  // Class name for fries styling
                x: randomValue(-500, screenWidth),  // Random x position
                y: randomValue(-1000, -6000),  // Random y position (off-screen to start)
                z: randomValue(0, 0),  // Random z-depth for 3D effect
                //scale: randomValue(0.5, 0.5),  // Random scale to simulate different fry sizes
            });
            containerRef.current.appendChild(fryElement);
            animateFry(fryElement);
        }

        function animateFry(fry) {
            gsap.to(fry, randomValue(100, 100), {  // Fries fall down
                y: screenHeight + 2000,  // Move the fries down beyond the screen
                rotation: randomValue(-360, 360),  // Random rotation for fries
                x: `+=${randomValue(-100, 100)}`,  // Random horizontal movement
               // scaleX: randomValue(0.4, 0.4),  // Horizontal scaling for variety
               // scaleY: randomValue(0.4, 0.4),  // Vertical scaling for variety
                ease: "circ.out",  // Smooth fall effect
                repeat: 1,  // Loop indefinitely
                delay: randomValue(5, 10),  // Staggered delays for fries
            });
        }

        function randomValue(min, max) {
            return min + Math.random() * (max - min);  // Random number generator
        }
    }, [friesCount, screenWidth, screenHeight]);

    return <div id="friesAnimationContainer" ref={containerRef}></div>;
};

export default FriesAnimations;
