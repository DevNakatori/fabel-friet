import { useEffect, useRef } from "react";
import gsap from "gsap";
import '../styles/FriesAnimation.css';

const Friesanimation = () => {
    const containerRef = useRef(null);
    const total = 20;
    const w = window.innerWidth;
    const h = window.innerHeight;

    useEffect(() => {
        gsap.set("#containerfriesanimation", { perspective: 600 });
        gsap.set("img", { xPercent: "-100%", yPercent: "-100%" });

        for (let i = 0; i < total; i++) {
            const Div = document.createElement("div");
            gsap.set(Div, {
                attr: { class: "dot" },
                x: R(0, w),
                y: R(-500, 0),
                z: R(-500, 200),
            });
            containerRef.current.appendChild(Div);
            animm(Div);
        }

        function animm(elm) {
            gsap.to(elm, R(10, 30), {
                y: h + 1,
                ease: "circ.out",
                repeat: -1,
                //delay: -15,
            });
            gsap.to(elm, R(1, 50), {
                x: "+=100",
                rotationZ: R(0, 10),
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
            });
            gsap.to(elm, R(2, 8), {
                rotationX: R(0, 5),
                rotationY: R(0, 5),
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
                //delay: -5,
            });
        }

        function R(min, max) {
            return min + Math.random() * (max - min);
        }
    }, [total, w, h]);

    return <div id="containerfriesanimation" ref={containerRef}></div>;
};

export default Friesanimation;
