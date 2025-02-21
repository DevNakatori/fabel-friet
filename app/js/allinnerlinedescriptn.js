import gsap from 'gsap';
import SplitType from 'split-type';

const allinnerlinedescriptn = () => {
  const sectionsallinnerlinedescriptn = gsap.utils.toArray('[data-allinnerdescription]'); 
  sectionsallinnerlinedescriptn.forEach((sectionallinnerlinedescriptn) => {
    const typeSplitonzefriendescription = new SplitType(sectionallinnerlinedescriptn, {
      types: 'lines, words, chars',
      tagName: 'span',
    });
    gsap.from(sectionallinnerlinedescriptn.querySelectorAll('.line'), {
        opacity: 0.3,
        duration: 0.3,
        ease: 'power1.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionallinnerlinedescriptn,
          start: 'top center',
          scrub: true,
          once: false, 
          toggleActions: "restart none none none",
        },
    });
  });
};
export default allinnerlinedescriptn;
