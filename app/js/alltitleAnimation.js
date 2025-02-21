import gsap from 'gsap';
import SplitType from 'split-type';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const alltitleAnimation = () => {
  const sectionsalltitle = gsap.utils.toArray('[data-title]');
  sectionsalltitle.forEach((sectionalltitle) => {
    const typeSplit = new SplitType(sectionalltitle, {
      types: 'lines, words, chars',
      tagName: 'span',
    });
    const charsOnzefrienttitle = typeSplit.chars;
    gsap.from(sectionalltitle.querySelectorAll('.line'), {
      y: '100%',
      opacity: 0,
      duration: 1,
      ease: 'circ.in',
      stagger: 0.3,
      scrollTrigger: {
        trigger: sectionalltitle,
        start: 'top bottom',
        end: 'bottom top',
      },
      onUpdate: function () {
        charsOnzefrienttitle.forEach((char) => {
          char.style.backgroundImage = "url('/assets/plain-gold-background-C9ahylQT.webp')";
          char.style.webkitBackgroundClip = 'text';
          char.style.webkitTextFillColor = 'transparent';
          char.style.backgroundPosition = '97px -83px';
        });
      },
    });
  });
  ScrollTrigger.refresh();
};
export default alltitleAnimation;
