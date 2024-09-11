import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../styles/onzefriet.css';


import onzie_one from '../assets/threeimg/Rectangle47.png';
import onzie_two from '../assets/threeimg/Rectangle45.png';
import onzie_three from '../assets/threeimg/Rectangle46.png';
import onzie_leftvidep from '../assets/threeimg/Rectangle43.png';
import bannerlogo from '../assets/logobanner.png'

gsap.registerPlugin(ScrollTrigger);

const Onzefriet = () => {
    useEffect(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: ".wrapper",
                start: "center center",
                end: "+=150%",
                pin: true,
                scrub: true,
                markers: true
            }
        })
            .to(".roundimage,.roundtext", {
                scale: 4,
                z: 350,
                transformOrigin: "center center",
                ease: "power1.inOut",
                scrub: true,
                zIndex: 5,
            })
            .to(".section.hero", {
                scale: 1.1,
                transformOrigin: "center center",
                ease: "power1.inOut"
            }, "<")
            .to(".gradient-purple", {
                scale: 1,
                borderRadius: 0,
                ease: "power3.easeIn",
                scrollTrigger: {
                    trigger: '.wrappertest',
                    start: "top top-500",
                    end: "top top-200",
                    scrub: true
                }
            }, 0);

        const container = document.querySelector("#container");
        const flTests = document.querySelector(".fl-tests");

        gsap.to(container, {
            x: () => -(container.offsetWidth - innerWidth) + "px",
            ease: "none",
            scrollTrigger: {
                scroller: ".fl-tests",
                trigger: "#container",
                start: "center center",
                pin: true,
                scrub: 0.5,
                invalidateOnRefresh: true,
                end: () => "+=" + (container.offsetWidth - innerWidth),
                markers: true,
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section className='panel secondesection' id="section2">
            <div className="wrapper">
                <div className='bannersectinlogo'>
                    <img src={bannerlogo}></img>
                </div>
                <div className='wrappermain'>
                    <img
                        className="media"
                        src="https://s3-alpha-sig.figma.com/img/eeda/7f7e/c275d393c488ff040abd318900bf7f3b?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pBFQSzrlRGKV7mUenhPyE7ZIyrEB195xhPiFbQgWEWt5kchrl9cKCyEoL6x93Xsjw4K3ET9da31rlCw4A-6UbpDItPD-d1Zf-LIME8DFBGsCikUdujbHA5qAoAglJYrZWpBe~1embN3fd6Q6ESZXRhqTwvAX~140gyF3sMOENg9g9Gq9TqbbhkmT2ExSQfEggOXaZHUvVjiA7Tw9skLzkK2kJxG81dHMLoV1NSDKrAuD9~lIHW1ZvxaiCK50ovH1zDnIJSsP02fsmBkWivO3BX1-qqUpN6IJSjUqobv0nPjMITdZd5KctKYdyWVQKKSVVhS4gmwf5vsrGLeYEFthbA__"
                        alt="Round Image"
                    />
                </div>

                <div className="roundimages">
                    <div className='roundtext'>
                        <h2>
                            onze
                        </h2>
                        <h3>
                            friet
                        </h3>
                    </div>
                    <div className="roundimage"></div>
                    <div className='scroll-down'>
                        <div className="icon-scroll"></div>
                        <p>Scroll down</p>
                    </div>
                </div>
            </div>
            <div className="wrappertest">
                <section className="section hero"></section>
                <div className="gradient-purple">
                    <h4>onze friet</h4>
                    <p>Geen Franse friet of Vlaamse friet, bij Fabel Friet bakken wij echte Hollandse friet. Elke dag weer geven wij alles om de lekkerste friet van Amsterdam te bakken. Daarbij maken wij gebruik van de beste kwaliteit Agria aardappelen van Nederlandse bodem welke speciaal zijn ontwikkeld voor friet. </p>
                    <div className='gradient-threebox'>
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
                    <div className='whitebgbox'>
                        <div className='whitewithvideomainbox'>
                            <div className='leftvideobox'>
                                <img src={onzie_leftvidep} alt="img" />
                            </div>
                            <div className='righttextbox'>
                                <h5>
                                    Lorem ipsum <br />dolor sit amet
                                </h5>
                                <p>
                                    Geen Franse friet of Vlaamse friet, bij Fabel Friet bakken wij echte Hollandse friet. Elke dag weer geven wij alles om de lekkerste friet van Amsterdam te bakken. Daarbij maken wij gebruik van de beste kwaliteit Agria aardappelen van Nederlandse bodem welke speciaal zijn ontwikkeld voor friet.
                                </p>
                            </div>
                        </div>

                        <div className='whatpeople-section'>
                            <h6>
                                What people say about us
                            </h6>

                            <div class="fl-tests">
                                <div id="container">
                                    <div class="module">
                                        <div className='wharpeoplebox'>
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>
                                                Stefan E.
                                            </b>
                                            <ul className='starrating'>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='blackstar'> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="module">
                                        <div className='wharpeoplebox'>
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>
                                                Stefan E.
                                            </b>
                                            <ul className='starrating'>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='blackstar'> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="module">
                                        <div className='wharpeoplebox'>
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>
                                                Stefan E.
                                            </b>
                                            <ul className='starrating'>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='blackstar'> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="module">
                                        <div className='wharpeoplebox'>
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>
                                                Stefan E.
                                            </b>
                                            <ul className='starrating'>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='blackstar'> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="module">
                                        <div className='wharpeoplebox'>
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>
                                                Stefan E.
                                            </b>
                                            <ul className='starrating'>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='blackstar'> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="module">
                                        <div className='wharpeoplebox'>
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>
                                                Stefan E.
                                            </b>
                                            <ul className='starrating'>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='blackstar'> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="module">
                                        <div className='wharpeoplebox'>
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>
                                                Stefan E.
                                            </b>
                                            <ul className='starrating'>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='blackstar'> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="module">
                                        <div className='wharpeoplebox'>
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>
                                                Stefan E.
                                            </b>
                                            <ul className='starrating'>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='blackstar'> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="module">
                                        <div className='wharpeoplebox'>
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>
                                                Stefan E.
                                            </b>
                                            <ul className='starrating'>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='blackstar'> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="module">
                                        <div className='wharpeoplebox'>
                                            <p>
                                                „Super lekkere friet, leuke zaak, in een historisch pandje, aardig personeel. Echt een aanrader“
                                            </p>
                                            <b>
                                                Stefan E.
                                            </b>
                                            <ul className='starrating'>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='star'></i>
                                                </li>
                                                <li>
                                                    <i className='blackstar'> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Onzefriet;
