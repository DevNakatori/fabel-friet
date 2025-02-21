import gsap from 'gsap';
import SplitType from 'split-type';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const blutextanimationtext = () => {

  const isHardRefreshlocatiesblutextanimationtext = window.performance.navigation.type === 1;
  const animationDelaylocatiesblutextanimationtext = isHardRefreshlocatiesblutextanimationtext ? 300 : 300;

  const initiateAnimationsonzlocatiesblutextanimationtext = () => {

    const sections = gsap.utils.toArray('[data-bluetitle]');
    sections.forEach((section) => {
      const typeSplit = new SplitType(section, {
        types: 'lines, words, chars',
        tagName: 'span',
      });
      const charsOnzefrienttitle = typeSplit.chars;
      gsap.from(section.querySelectorAll('.line'), {
        y: '100%',
        opacity: 0,
        duration: 1,
        ease: 'circ.in',
        stagger: 0.3,
        scrollTrigger: {
          trigger: '[data-bluetitle]',
        }
      });
    });
  };

  setTimeout(() => {
    initiateAnimationsonzlocatiesblutextanimationtext();
  }, animationDelaylocatiesblutextanimationtext);
  ScrollTrigger.refresh();
};
export default blutextanimationtext;
