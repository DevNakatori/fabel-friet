import gsap from 'gsap';
import SplitType from 'split-type';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const allinnerlinedescriptn = () => {

  const isHardRefreshlocatiesallinnerlinedescriptn = window.performance.navigation.type === 1;
  const animationDelaylocatiesallinnerlinedescriptn = isHardRefreshlocatiesallinnerlinedescriptn ? 300 : 300;

  const initiateAnimationsonzlocatiesallinnerlinedescriptn = () => {
    const sectionsallinnerlinedescriptn = gsap.utils.toArray('[data-allinnerdescription]');
    sectionsallinnerlinedescriptn.forEach((sectionallinnerlinedescriptn) => {
      const typeSplitonzefriendescription = new SplitType(sectionallinnerlinedescriptn, {
        types: 'lines, words, chars',
        tagName: 'span',
      });
      gsap.from(sectionallinnerlinedescriptn.querySelectorAll('.line'), {
        opacity: 0.3,
        duration: 0.5,
        ease: 'power1.out',
        stagger: 0.1,
      scrollTrigger: {
        trigger: sectionallinnerlinedescriptn,
        start: 'top 80%',
        scrub: true,
        once: false,
        toggleActions: "restart none none none",
      },
      });
    });
  };

  setTimeout(() => {
    initiateAnimationsonzlocatiesallinnerlinedescriptn();
  }, animationDelaylocatiesallinnerlinedescriptn);
  ScrollTrigger.refresh();
};
export default allinnerlinedescriptn;
