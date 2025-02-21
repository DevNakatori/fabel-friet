import gsap from 'gsap';
import SplitType from 'split-type';

const titledynamic = () => {
    
  const titledynamictitle = gsap.utils.toArray('.roundtext');
  titledynamictitle.forEach((titledynamictitles) => {
    if (window.innerWidth >= 1024) {
        const h3Element = titledynamictitles.querySelector("h3");
        const h2Element = titledynamictitles.querySelector("h2");

        if (h3Element) {
          const clientWidthH3 = h3Element.clientWidth;
          h3Element.style.right = `-${clientWidthH3 - 120}px`;
        }

        if (h2Element) {
          const clientWidthH2 = h2Element.clientWidth;
          h2Element.style.left = `-${clientWidthH2 - 90}px`;
        }
      }
  });
};

export default titledynamic;
