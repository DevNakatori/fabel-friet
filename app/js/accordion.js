import gsap from 'gsap';
const toggleAccordion = (e) => {
    const trigger = e.currentTarget;
    const content = trigger.nextElementSibling;
    document.querySelectorAll('.accordion-content').forEach((accordion) => {
        if (accordion !== content) {
            gsap.to(accordion, {
                height: 0,
                duration: 0.5,
                onComplete: () => (accordion.style.display = 'none'),
            });
            accordion.classList.remove('show');
            trigger.classList.remove('active');
        }
    });
    document.querySelectorAll('.accordion-header').forEach((item) => {
        if (item !== trigger) {
            item.classList.remove('active');
        }
    });
    if (content.classList.contains('show')) {
        gsap.to(content, {
            height: 0,
            duration: 0.5,
            onComplete: () => (content.style.display = 'none'),
        });
        content.classList.remove('show');
        trigger.classList.remove('active');
    } else {
        content.style.display = 'block';
        let contentHeight = content.scrollHeight;
        gsap.fromTo(content, { height: 0 }, { height: contentHeight, duration: 0.5 });
        content.classList.add('show');
        trigger.classList.add('active');
    }
};

export default toggleAccordion;
