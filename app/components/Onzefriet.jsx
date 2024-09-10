import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../styles/onzefriet.css';


import onzie_one from '../assets/threeimg/Rectangle47.png';
import onzie_two from '../assets/threeimg/Rectangle45.png';
import onzie_three from '../assets/threeimg/Rectangle46.png';

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
                borderRadius: 60,
                ease: "power3.easeIn",
                scrollTrigger: {
                    trigger: '.wrappertest',
                    start: "top top-500",
                    end: "top top-200",
                    scrub: true
                }
            }, 0);
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section className='panel secondesection' id="section2">
            <div className="wrapper">
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
                </div>
            </div>
            <div className="wrappertest">
                <section class="section hero"></section>
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
                </div>
            </div>
        </section>
    );
};

export default Onzefriet;
