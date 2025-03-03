import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const potetoanimation = () => {
    gsap.utils.toArray(".overlaybannehand-bottomss").forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                pinnedContainer: element,
                start: "98% 98%",
                end: "100% 100%",
                scrub: true,
                markers: false,
                repeat: 1,
                once: false,
            },
            filter: "blur(5px)",
        });
    });
    ScrollTrigger.refresh();
};
export default potetoanimation;
