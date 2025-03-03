import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const potetoanimation = () => {
    if (window.innerWidth >= 1024) {
        setTimeout(() => {
            gsap.utils.toArray(".overlaybannehand-bottomss").forEach(element => {
                gsap.to(element, {
                    opacity: 0,  
                    duration: 0.9,
                    ease: 'none.inOut',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: element,
                        id:"potetos",
                        start: "top 85%",  
                        //end: "top 5%",    
                        scrub: 0.5,       
                        toggleActions: "play none reverse none", 
                        markers: false,     
                    }
                });
            });
        }, 9000); 
    }
    ScrollTrigger.refresh();
};

export default potetoanimation;
