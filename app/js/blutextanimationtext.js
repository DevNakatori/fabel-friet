import gsap from 'gsap';
import SplitType from 'split-type';
const blutextanimationtext = () => {

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
export default blutextanimationtext;
