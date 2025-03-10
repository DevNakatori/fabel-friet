// import React, { useEffect, useRef, useState} from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { getImageUrl } from '../js/imagesurl';


// gsap.registerPlugin(ScrollTrigger);

// const ZoomSection = ({ image, alt, h2Text, h3Text }) => {
//   const wrapperRef = useRef(null);
//   const zoomSectionRef = useRef(null);

//   useEffect(() => {

//     const isMobile = window.innerWidth <= 768;
//     const timeline = gsap.timeline({
//       scrollTrigger: {
//         trigger: wrapperRef.current,
//         start: 'top top',
//         //end: () => `+=${wrapperRef.current.offsetHeight}`,
//         pin: true,
//         pinnedContainer: isMobile ? '' : wrapperRef.current,
//         scrub: 0.5,
//         markers: false,
//         repeat: 1,
//         delay: 0.2,
//         pinSpacing: false,
//         pinSpacer:isMobile ? false : true,
//         anticipatePin: isMobile ? 1 : 1,
//         stagger: 0.1,
//        // pinReparent: true,
//          //anticipatePin: 1,
//         // snap: {
//         //   snapTo: 1,
//         //   duration: 1.5,
//         //   directional: true,
//         //   ease: "power1.in",
//         // },
//         onEnterBack: () => {
//           if (isMobile) {
//             ScrollTrigger.update();  
//           } else {
//             ScrollTrigger.refresh(); 
//           }
//         },
//         onLeave: () => {
//           if (isMobile) {
//             ScrollTrigger.update();  
//           } else {
//             ScrollTrigger.refresh(); 
//           }
//         },
//       },
//     })
//       .to(zoomSectionRef.current, {
//         //scale: 1.1,
//         scale: isMobile ? 1.3 : 1.1,
//         z: 300,
//         stagger: 0.1,
//         transformOrigin: 'center center',
//         ease: 'power1.in',
//       });
//     // Cleanup when component unmounts
//     return () => {
//       timeline.scrollTrigger.kill();
//       ScrollTrigger.refresh();
//     };
//   }, []);

//   return (
//     <div ref={wrapperRef} className="wrapper" data-zoom-sectiononzefriet>
//       <div className="image-container">
//         <div className="wrappermain">
//           <div className="wrappermain_inner">
//             <img
//               className="media"
//               src={image}
//               alt={alt}
//               width="10"
//               height="10"
//             />
//           </div>
//         </div>
//         <div className="roundimages" data-zoom-section-inneronzefriet ref={zoomSectionRef}>
//           <div className="roundtext" data-zoom-section-inneronzefriet>
//             <h2 dangerouslySetInnerHTML={{ __html: h2Text }} />
//             <h3 dangerouslySetInnerHTML={{ __html: h3Text }} />
//           </div>
//           <div className="roundimage roundimagesround" data-zoom-section-inneronzefriet></div>
//           <div className="scroll-down">
//             <div className="scroll-down">
//               <div className="icon-scroll"></div>
//               <p>Scroll down</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ZoomSection;

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getImageUrl } from '../js/imagesurl';

gsap.registerPlugin(ScrollTrigger);

const ZoomSection = ({ image, alt, h2Text, h3Text }) => {
  const wrapperRef = useRef(null);
  const zoomSectionRef = useRef(null);

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isMobile = window.innerWidth <= 768;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        pin: true,
        pinnedContainer: isMobile ? '' : wrapperRef.current,
        scrub: 0.5,
        markers: false,
        repeat: 1,
        delay: 0.2,
        pinSpacing: false,
        pinSpacer: isMobile ? false : true,
        anticipatePin: 1,
        stagger: 0.1,
        onEnterBack: () => {
          if (isSafari || isMobile) {
            ScrollTrigger.update(); 
          } else {
            ScrollTrigger.refresh(); 
          }
        },
        onLeave: () => {
          if (isSafari || isMobile) {
            ScrollTrigger.update(); 
          } else {
            ScrollTrigger.refresh(); 
          }
        },
      },
    })
      .to(zoomSectionRef.current, {
        scale: isMobile ? 1.3 : 1.1,
        z: 300,
        stagger: 0.1,
        transformOrigin: 'center center',
        ease: 'power1.in',
      });
    return () => {
      timeline.scrollTrigger.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="wrapper" data-zoom-sectiononzefriet>
      <div className="image-container">
        <div className="wrappermain">
          <div className="wrappermain_inner">
            <img
              className="media"
              src={image}
              alt={alt}
              width="10"
              height="10"
            />
          </div>
        </div>
        <div className="roundimages" data-zoom-section-inneronzefriet ref={zoomSectionRef}>
          <div className="roundtext" data-zoom-section-inneronzefriet>
            <h2 dangerouslySetInnerHTML={{ __html: h2Text }} />
            <h3 dangerouslySetInnerHTML={{ __html: h3Text }} />
          </div>
          <div className="roundimage roundimagesround" data-zoom-section-inneronzefriet></div>
          <div className="scroll-down">
            <div className="scroll-down">
              <div className="icon-scroll"></div>
              <p>Scroll down</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomSection;

