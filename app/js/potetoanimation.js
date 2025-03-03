import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const potetoanimation = () => {
    if (window.innerWidth >= 1024) {
        gsap.utils.toArray(".overlaybannehand-bottomss").forEach(element => {
            gsap.to(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "98% 98%",
                    end: "100% 100%",
                    scrub: true,
                    markers: false,
                },
                filter: "blur(2px)",
                zIndex: -1
            });
        });
    }
    ScrollTrigger.refresh();
};

export default potetoanimation;
