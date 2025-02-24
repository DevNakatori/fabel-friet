import gsap from 'gsap';

const whatsappanimation = () => {
  const icons = document.querySelectorAll('.whatsapp-icon');
  function animateIcons() {
    icons.forEach((icon) => {
      gsap.to(icon, {
        y: `random(100, -350)`, 
        x: `random(100, 2000)`, 
        opacity:10, 
        duration: 5, 
        ease: "linear", 
        repeat: -1, 
        delay: Math.random() * 10, 
        onStart: () => {
          gsap.set(icon, { x: 0, y: 0, opacity: 1 });
        }
      });
    });
  }
  animateIcons();
};
export default whatsappanimation;
