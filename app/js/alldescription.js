import gsap from 'gsap';
import SplitType from 'split-type';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const alldescription = () => {

  const isHardRefreshlocaties = window.performance.navigation.type === 1;
  const animationDelaylocaties = isHardRefreshlocaties ? 300 : 300;

  const initiateAnimationsonzlocaties = () => {
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

  setTimeout(() => {
    initiateAnimationsonzlocaties();
  }, animationDelaylocaties);

  ScrollTrigger.refresh();
};
export default alldescription;
