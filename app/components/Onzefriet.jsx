import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import '../styles/onzefriet.css';

import onzie_one from '../assets/resizeimgs/Rectangle47.png';
import onzie_two from '../assets/resizeimgs/Rectangle45.png';
import onzie_three from '../assets/resizeimgs/Rectangle46.png';
import onzie_leftvidep from '../assets/resizeimgs/Rectangle43.png';
import bannerlogo from '../assets/resizeimgs/logobanner.png';
import mainbannerbg from '../assets/resizeimgs/c275d393c488ff040abd318900bf7f3b.png';

import fries_one from '../assets/resizeimgs/Rectangle89.png';
import fries_two from '../assets/resizeimgs/Rectangle88.png';
import fries_three from '../assets/resizeimgs/AdobeStock_616168104.png';
import fries_four from '../assets/resizeimgs/AdobeStock_616168104.png';
import fries_five from '../assets/resizeimgs/Rectangle90.png';
import fries_six from '../assets/resizeimgs/Rectangle91.png';
import fries_seven from '../assets/resizeimgs/Rectangle92.png';
import fries_eight from '../assets/resizeimgs/Rectangle93.png';


gsap.registerPlugin(ScrollTrigger, SplitText);

const Onzefriet = () => {

    useEffect(() => {
        gsap
            .timeline({
                scrollTrigger: {
                    trigger: '.wrapper',
                    start: 'center center',
                    end: '+=150%',
                    pin: true,
                    scrub: true,
                    markers: false,
                },
            })
            .to('.roundimage,.roundtext', {
                scale: 4,
                z: 350,
                transformOrigin: 'center center',
                ease: 'power1.inOut',
                scrub: true,
                zIndex: 5,
            })
            .to(
                '.section.hero',
                {
                    scale: 1.1,
                    transformOrigin: 'center center',
                    ease: 'power1.inOut',
                },
                '<',
            )
            .to(
                '.gradient-purple',
                {
                    scale: 1,
                    borderRadius: 0,
                    ease: 'power3.easeIn',
                    scrollTrigger: {
                        trigger: '.wrappertest',
                        start: 'top top-500',
                        end: 'top top-200',
                        scrub: true,
                    },
                },
                0,
            );



        gsap.to(".leftvideobox", {
            scrollTrigger: {
                trigger: ".whitewithvideomainbox",
                start: "top top",
                end: "bottom top",
                scrub: true,
                // Additional settings if needed
            },
            x: 0, // Final position (default 0)
            opacity: 1, // Final opacity
            ease: "power1.out", // Ease for the animation
            duration: 1 // Duration of the animation
        });

        // Animation for the right box
        gsap.to(".righttextbox", {
            scrollTrigger: {
                trigger: ".whitewithvideomainbox",
                start: "top top",
                end: "bottom top",
                scrub: true,
                // Additional settings if needed
            },
            x: 0, // Final position (default 0)
            opacity: 1, // Final opacity
            ease: "power1.out", // Ease for the animation
            duration: 1 // Duration of the animation
        });




        // gsap.fromTo('.leftvideobox',
        //     { opacity: 1, y: -30 },
        //     {
        //         opacity: 1,
        //         y: 0,
        //         stagger: 0.2,
        //         duration: 1,
        //         ease: 'power2.out',
        //         delay: 2,
        //         scrollTrigger: { trigger: '.whitewithvideomainbox', start: 'center center', end: 'center center', scrub: true, repeat: 0 }
        //     },
        // );

        // gsap.fromTo('.righttextbox',
        //     { opacity: 1, y: -30 },
        //     {
        //         opacity: 1,
        //         y: 0,
        //         stagger: 0.2,
        //         duration: 1,
        //         ease: 'power2.out',
        //         delay: 2,
        //         scrollTrigger: { trigger: '.whitewithvideomainbox', start: 'center center', end: 'center center', scrub: true, repeat: 0 }
        //     },
        // );


        var split = new SplitText("#lodo", { type: "chars" });
        gsap.from(split.chars, {
            duration: 1,
            y: 100,
            autoAlpha: 0,
            stagger: 0.05
        });


        // gsap.fromTo('.righttextbox',
        //     { x: '100vw', opacity: 0 },
        //     { x: 0, opacity: 1, scrollTrigger: { trigger: '.whitewithvideomainbox', start: 'center center', end: 'top center', scrub: true } }
        // );

        const container = document.querySelector('#container');
        const flTests = document.querySelector('.fl-tests');

        gsap.to(container, {
            x: () => -(container.offsetWidth - innerWidth) + 'px',
            ease: 'none',
            scrollTrigger: {
                scroller: '.fl-tests',
                trigger: '#container',
                start: 'center center',
                pin: true,
                scrub: 0.5,
                invalidateOnRefresh: true,
                end: () => '+=' + (container.offsetWidth - innerWidth),
                markers: false,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);


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

    return (
        <section className="panel secondesection" id="section2">
            <div className="wrapper">
                <div className="bannersectinlogo">
                    <img src={bannerlogo}></img>
                </div>
                <div className="wrappermain">
                    <img className="media" src={mainbannerbg} alt="Round Image" />
                </div>

                <div className="roundimages">
                    <div className="roundtext">
                        <h2>onze</h2>
                        <h3>friet</h3>
                    </div>
                    <div className="roundimage"></div>
                    <div className="scroll-down">
                        <div className="icon-scroll"></div>
                        <p>Scroll down</p>
                    </div>
                </div>
            </div>
            <div className="wrappertest">
                <section className="section hero"></section>
                <div className="gradient-purple">
                    <div className='allfiressections'>
                        <img src={fries_one} alt="img" />
                        <img src={fries_two} alt="img" />
                        <img src={fries_three} alt="img" />
                        <img src={fries_five} alt="img" />
                        <img src={fries_six} alt="img" />
                        <img src={fries_seven} alt="img" />
                        <img src={fries_eight} alt="img" />
                    </div>
                    <h4 >onze friet</h4>
                    <p id="lodo">
                        Geen Franse friet of Vlaamse friet, bij Fabel Friet bakken wij echte
                        Hollandse friet. Elke dag weer geven wij alles om de lekkerste friet
                        van Amsterdam te bakken. Daarbij maken wij gebruik van de beste
                        kwaliteit Agria aardappelen van Nederlandse bodem welke speciaal
                        zijn ontwikkeld voor friet.{' '}
                    </p>
                    <div className="gradient-threebox">
                        <ul>
                            <li>
                                <img src={onzie_one} alt="img" />
                            </li>
                            <li>
                                <img src={onzie_two} alt="img" />
                            </li>
                            <li>
                                <img src={onzie_three} alt="img" />
                            </li>
                        </ul>
                    </div>
                    <div className="whitebgbox">
                        <div className="whitewithvideomainbox">
                            <div className="leftvideobox">
                                <img src={onzie_leftvidep} alt="img" />
                            </div>
                            <div className="righttextbox">
                                <h5>
                                    Lorem ipsum <br />
                                    dolor sit amet
                                </h5>
                                <p>
                                    Geen Franse friet of Vlaamse friet, bij Fabel Friet bakken wij
                                    echte Hollandse friet. Elke dag weer geven wij alles om de
                                    lekkerste friet van Amsterdam te bakken. Daarbij maken wij
                                    gebruik van de beste kwaliteit Agria aardappelen van
                                    Nederlandse bodem welke speciaal zijn ontwikkeld voor friet.
                                </p>
                            </div>
                        </div>

                        <div className="whatpeople-section">
                            <h6>What people say about us</h6>

                            <div className="fl-tests">
                                <div id="container">
                                    <div className="module">
                                        <div className="wharpeoplebox">
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch
                                                pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>Stefan E.</b>
                                            <ul className="starrating">
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="blackstar"> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="module">
                                        <div className="wharpeoplebox">
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch
                                                pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>Stefan E.</b>
                                            <ul className="starrating">
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="blackstar"> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="module">
                                        <div className="wharpeoplebox">
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch
                                                pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>Stefan E.</b>
                                            <ul className="starrating">
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="blackstar"> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="module">
                                        <div className="wharpeoplebox">
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch
                                                pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>Stefan E.</b>
                                            <ul className="starrating">
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="blackstar"> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="module">
                                        <div className="wharpeoplebox">
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch
                                                pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>Stefan E.</b>
                                            <ul className="starrating">
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="blackstar"> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="module">
                                        <div className="wharpeoplebox">
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch
                                                pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>Stefan E.</b>
                                            <ul className="starrating">
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="blackstar"> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="module">
                                        <div className="wharpeoplebox">
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch
                                                pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>Stefan E.</b>
                                            <ul className="starrating">
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="blackstar"> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="module">
                                        <div className="wharpeoplebox">
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch
                                                pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>Stefan E.</b>
                                            <ul className="starrating">
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="blackstar"> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="module">
                                        <div className="wharpeoplebox">
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch
                                                pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>Stefan E.</b>
                                            <ul className="starrating">
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="blackstar"> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="module">
                                        <div className="wharpeoplebox">
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch
                                                pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>Stefan E.</b>
                                            <ul className="starrating">
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="star"></i>
                                                </li>
                                                <li>
                                                    <i className="blackstar"> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main-accordian">
                            <h6>Veel gestelde vragen</h6>

                            <div className="accordion-container">
                                <div className="accordion-item">
                                    <button
                                        className="accordion-header"
                                        onClick={toggleAccordion}
                                    >
                                        Welke allergenen zitten er in jullie producten?{' '}
                                        <span className="icon"></span>
                                    </button>
                                    <div className="accordion-content">
                                        <p>
                                            De 14 allergenen waarover wij de consument moeten
                                            informeren op basis van de Europese verordening 1169/2011
                                            zijn: glutenbevattende granen, ei, vis, pinda, noten,
                                            soja, melk (inclusief lactose), schaaldieren, weekdieren,
                                            selderij, mosterd, sesamzaad, sulfiet en lupine. U kunt de
                                            allergeneninformatie raadplegen via deze link (**add
                                            hyperlink to the word "link" to the QR menu page**) en
                                            door op de informatieknop (i) te klikken.
                                        </p>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <button
                                        className="accordion-header"
                                        onClick={toggleAccordion}
                                    >
                                        Welke olie gebruiken jullie? <span className="icon"></span>
                                    </button>
                                    <div className="accordion-content">
                                        <p>
                                            Onze frietjes zijn glutenvrij. We filteren de olie die
                                            voor de friet wordt gebruikt apart van de olie die voor
                                            glutenbevattende snacks wordt gebruikt, zodat er geen
                                            kruisbesmetting plaatsvindt. Houd er echter rekening mee
                                            dat we wel producten verkopen die gluten bevatten. U kunt
                                            de allergeneninformatie raadplegen via deze link (**add
                                            hyperlink to the word "link" to the QR menu page**) en
                                            door op de informatieknop (i) te klikken.
                                        </p>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <button
                                        className="accordion-header"
                                        onClick={toggleAccordion}
                                    >
                                        Bevat jullie friet gluten? <span className="icon"></span>
                                    </button>
                                    <div className="accordion-content">
                                        <p>
                                            Onze frietjes zijn glutenvrij. We filteren de olie die
                                            voor de friet wordt gebruikt apart van de olie die voor
                                            glutenbevattende snacks wordt gebruikt, zodat er geen
                                            kruisbesmetting plaatsvindt. Houd er echter rekening mee
                                            dat we wel producten verkopen die gluten bevatten. U kunt
                                            de allergeneninformatie raadplegen via deze link (**add
                                            hyperlink to the word "link" to the QR menu page**) en
                                            door op de informatieknop (i) te klikken.
                                        </p>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <button
                                        className="accordion-header"
                                        onClick={toggleAccordion}
                                    >
                                        Kan er bij jullie gereserveerd worden?{' '}
                                        <span className="icon"></span>
                                    </button>
                                    <div className="accordion-content">
                                        <p>
                                            Onze frietjes zijn glutenvrij. We filteren de olie die
                                            voor de friet wordt gebruikt apart van de olie die voor
                                            glutenbevattende snacks wordt gebruikt, zodat er geen
                                            kruisbesmetting plaatsvindt. Houd er echter rekening mee
                                            dat we wel producten verkopen die gluten bevatten. U kunt
                                            de allergeneninformatie raadplegen via deze link (**add
                                            hyperlink to the word "link" to the QR menu page**) en
                                            door op de informatieknop (i) te klikken.
                                        </p>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <button
                                        className="accordion-header"
                                        onClick={toggleAccordion}
                                    >
                                        Kan ik online bestellen? <span className="icon"></span>
                                    </button>
                                    <div className="accordion-content">
                                        <p>
                                            Onze frietjes zijn glutenvrij. We filteren de olie die
                                            voor de friet wordt gebruikt apart van de olie die voor
                                            glutenbevattende snacks wordt gebruikt, zodat er geen
                                            kruisbesmetting plaatsvindt. Houd er echter rekening mee
                                            dat we wel producten verkopen die gluten bevatten. U kunt
                                            de allergeneninformatie raadplegen via deze link (**add
                                            hyperlink to the word "link" to the QR menu page**) en
                                            door op de informatieknop (i) te klikken.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='overlaybannehand-bottoms'></div>
                        <div className="bottomsection">
                            <div className="scroll-down">
                                <div className="icon-scroll"></div>
                                <p>Scroll down</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Onzefriet;
