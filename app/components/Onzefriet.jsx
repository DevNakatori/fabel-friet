import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../styles/onzefriet.css';

gsap.registerPlugin(ScrollTrigger);

const Onzefriet = () => {
    useEffect(() => {
        gsap.fromTo(
            '.roundimage',
            { scale: 1 },
            {
                scale: 4,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.wrapper',
                    pin: true,
                    start: 'top top',
                    end: '+=1000',
                    scrub: true,
                    markers: true,
                }
            }
        );


        const overlayAnimation = gsap.to('.overlayss', {
            height: '100%',
            scaleY: 1,
            duration: 1,
            ease: 'power2.out',
            paused: true,
            markers: true,
        });

        ScrollTrigger.create({
            trigger: '.wrappertest',
            start: 'center 90%',
            end: 'bottom bottom',
            markers: true,
            onEnter: () => overlayAnimation.play(),
            onLeaveBack: () => overlayAnimation.reverse(),
        });


        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section>
            <div className="wrapper">
                <div className="roundimage">
                    <img
                        className="media"
                        src="https://s3-alpha-sig.figma.com/img/eeda/7f7e/c275d393c488ff040abd318900bf7f3b?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pBFQSzrlRGKV7mUenhPyE7ZIyrEB195xhPiFbQgWEWt5kchrl9cKCyEoL6x93Xsjw4K3ET9da31rlCw4A-6UbpDItPD-d1Zf-LIME8DFBGsCikUdujbHA5qAoAglJYrZWpBe~1embN3fd6Q6ESZXRhqTwvAX~140gyF3sMOENg9g9Gq9TqbbhkmT2ExSQfEggOXaZHUvVjiA7Tw9skLzkK2kJxG81dHMLoV1NSDKrAuD9~lIHW1ZvxaiCK50ovH1zDnIJSsP02fsmBkWivO3BX1-qqUpN6IJSjUqobv0nPjMITdZd5KctKYdyWVQKKSVVhS4gmwf5vsrGLeYEFthbA__"
                        alt="Round Image"
                    />
                </div>
            </div>
            <div className="wrappertest">
                <div className="overlayss">
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    </p>
                    {/* Additional paragraphs omitted for brevity */}
                </div>
            </div>
        </section>
    );
};

export default Onzefriet;
