import React, { useEffect } from 'react';
import gsap from 'gsap';
import backgroundImageUrl from '../assets/resizeimgs/webp/tiktiokbg.webp';
import videoone from '../assets/1.webp';
import videotwo from '../assets/2.webp';
import videothree from '../assets/3.webp';

const GradientGetInTouch = ({ images }) => {

    useEffect(() => {
        const listgetintouch = document.querySelectorAll('.gradient-threeboxgetintouch');
        listgetintouch.forEach((listgetintouch) => {
            const itemsgetintouch = listgetintouch.querySelectorAll('ul li.gradientgetintouchlist');
            const firstItemgetintouch = itemsgetintouch[0];
            const lastItemgetintouch = itemsgetintouch[itemsgetintouch.length - 1];
            const middleItemgetintouch = itemsgetintouch[1];

            const mobileMediaQuerygetintouch = window.matchMedia('(max-width: 768px)');

            let animateMobileTimeline;
            let animateDesktopTimeline;

            const animateDesktopgetintouch = () => {
                if (animateMobileTimeline) animateMobileTimeline.scrollTrigger.kill();

                const onzefritthreeimagecentergetintouch = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.sixthsection .wrappertest',
                        start: 'top top',
                        end: 'bottom top',
                        onEnter: () => {
                            const videos = document.querySelectorAll('.tiktokvidoe');
                            videos.forEach(video => {
                                video.play();
                            });
                        }
                    },
                });

                onzefritthreeimagecentergetintouch.fromTo(
                    middleItemgetintouch,
                    { bottom: '-55vh', rotation: 0, opacity: 0 },
                    {
                        bottom: '0vh',
                        duration: 1,
                        opacity: 1,
                    },
                );

                const onzefritthreeimageleftgetintouch = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.sixthsection  .gradient-purple',
                        start: 'top top',
                        end: 'bottom top',
                    },
                });

                onzefritthreeimageleftgetintouch
                    .fromTo(
                        firstItemgetintouch,
                        { left: '-50vw', rotation: 0, opacity: 0 },
                        {
                            left: '-9vw',
                            opacity: 1,
                            duration: 1,
                        },
                    )
                    .to(firstItemgetintouch, {
                        rotation: -8,
                        duration: 1,
                        delay: 1,
                    });

                const onzefritthreeimagerightgetintouch = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.sixthsection .gradient-purple',
                        start: 'top top',
                        end: 'bottom top',
                    },
                });

                onzefritthreeimagerightgetintouch
                    .fromTo(
                        lastItemgetintouch,
                        { right: '-50vw', rotation: 0, opacity: 0 },
                        {
                            right: '-9vw',
                            opacity: 1,
                            duration: 1,
                        },
                    )
                    .to(lastItemgetintouch, {
                        rotation: 8,
                        duration: 1,
                        delay: 1,
                    });
            };

            const animateMobilegetintouch = () => {
                if (animateDesktopTimeline) animateDesktopTimeline.scrollTrigger.kill();

                const mobileTimelineCenter = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.sixthsection .wrappertest',
                        start: 'top top',
                        end: 'bottom top',
                    },
                });

                mobileTimelineCenter.fromTo(
                    middleItemgetintouch,
                    { bottom: '-30vh', rotation: 0, opacity: 0 },
                    {
                        bottom: '0vh',
                        duration: 0.7,
                        opacity: 1,
                    },
                );

                const mobileTimelineLeft = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.sixthsection .gradient-purple',
                        start: 'top top',
                        end: 'bottom top',
                    },
                });

                mobileTimelineLeft
                    .fromTo(
                        firstItemgetintouch,
                        { left: '-30vw', rotation: 0, opacity: 0 },
                        {
                            left: '0vw',
                            opacity: 1,
                            duration: 0.7,
                        },
                    )
                    .to(firstItemgetintouch, {
                        rotation: -4,
                        duration: 0.7,
                        delay: 1,
                    });

                const mobileTimelineRight = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.sixthsection .gradient-purple',
                        start: 'top top',
                        end: 'bottom top',
                    },
                });

                mobileTimelineRight
                    .fromTo(
                        lastItemgetintouch,
                        { right: '-30vw', rotation: 0, opacity: 0 },
                        {
                            right: '0vw',
                            opacity: 1,
                            duration: 0.7,
                        },
                    )
                    .to(lastItemgetintouch, {
                        rotation: 4,
                        duration: 0.7,
                        delay: 1,
                    });
            };

            if (mobileMediaQuerygetintouch.matches) {
                animateMobilegetintouch();
            } else {
                animateDesktopgetintouch();
            }

        });

        const textContent = 'lekkerste friet van Amsterdam!';
        const textLength = textContent.length;
        const duration = textLength * 0.05;
        gsap.fromTo(
            '.sixthsection #animated-text',
            { text: '' },
            {
                text: textContent,
                duration: duration,
                ease: 'none',
                delay: 2,
                scrollTrigger: {
                    trigger: '.whitewithvideomainbox',
                    start: 'top 75%',
                    end: 'top 25%',
                    toggleActions: 'play none none none',
                },
            },
        );
    }, []);

    return (

        <ul
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
        >
            <li
                style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="gradientgetintouchlist"
                id="tiktokIframeContainer"
            >
                <video poster={videoone} className="tiktokvidoe" controls preload="true" disablePictureInPicture controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar" src="https://cdn.shopify.com/videos/c/o/v/6a8710d0b59e43c1bb1d565f2985b813.mp4" loop muted playsInline />
            </li>
            <li
                style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="gradientgetintouchlist"
                id="tiktokIframeContainer1"
            >
                <video poster={videotwo} className="tiktokvidoe" controls preload="true" disablePictureInPicture controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar" src="https://cdn.shopify.com/videos/c/o/v/69ee51f392084784994b1ca6b5ef227a.mp4" loop muted playsInline />
            </li>
            <li
                style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="gradientgetintouchlist"
                id="tiktokIframeContainer2"
            >
                <video poster={videothree} className="tiktokvidoe" controls preload="true" disablePictureInPicture controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar" src="https://cdn.shopify.com/videos/c/o/v/6b07ae8f50764096a2c77ec414f5442f.mp4" loop muted playsInline />
            </li>
        </ul>

    );
};

export default GradientGetInTouch;
