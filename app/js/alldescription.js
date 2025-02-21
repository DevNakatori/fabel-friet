import gsap from 'gsap';
import SplitType from 'split-type';

const alldescription = () => {
  const sectionsalldescription = gsap.utils.toArray('[data-description]'); 
  sectionsalldescription.forEach((sectionalldescription) => {
    const typeSplitonzefriendescription = new SplitType(sectionalldescription, {
      types: 'lines, words, chars',
      tagName: 'span',
    });
    gsap.from(sectionalldescription.querySelectorAll('.line'), {
      y: '100%',
      opacity: 0,
      duration: 0.45,
      ease: 'none.inOut',
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionalldescription, 
        start: 'top center',
        once: false, 
        toggleActions: "restart none none none",
      },
    });
  });
};
export default alldescription;
