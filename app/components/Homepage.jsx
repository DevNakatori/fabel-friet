import { useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import '../styles/homebanner.css';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollSmoother } from "gsap/ScrollSmoother";
import SplitText from 'gsap/SplitText';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';

import bannerlogo from '../assets/resizeimgs/logobanner.png';
import writingicon from '../assets/resizeimgs/writingicon.png';

gsap.registerPlugin(TextPlugin, ScrollSmoother, SplitText, DrawSVGPlugin);

const HomePage = () => {
    const [bannerData, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const smoother = ScrollSmoother.create({
            smooth: 3,
            effects: true
        });
        smoother.effects(".allfiressections img", { speed: "auto" });

        gsap.fromTo(
            'nav.header-menu-desktop .header-menu-item',
            { opacity: 0, y: -30 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 1,
                ease: 'power2.out',
                delay: 2,
            },
        );



        const fetchData = async () => {
            try {
                const bannerData = await client.fetch(`*[_type == "homebanner"][0]{
          bannerVideo,
          bannerLogo,
          title,
          bannerContent,
          bannerButton,
          bannerText,
          bannerImage
        }`);
                console.log('Banner Data:', bannerData);

                setBanner(bannerData);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!loading) {
            gsap.to('.loadersite', {
                duration: 1,
                opacity: 0,
                onComplete: () => {
                    // document.querySelector('.loadersite').style.display = 'none';
                    document.body.classList.add('hiddenoverflow');

                    gsap.to('.banner_video', {
                        autoAlpha: 1,
                        duration: 0,
                        delay: 0.1,
                    });
                },
            });
        }
    }, [loading]);

    useEffect(() => {
        const video = document.getElementById('myVideo');
        const overlayMain = document.querySelector('.banner_overlaymain');
        const overlay = document.querySelector('.banner_overlay');
        const elements = {
            logo: document.querySelector('.bannerlogo'),
            title: document.querySelector('.banner_title_text'),
            content: document.querySelector('.banner_content_text'),
            button: document.querySelector('.banner_bottombtn'),
            rotateText: document.querySelector('.bannerrotate_text'),
        };

        if (video) {
            video.autoplay = true;
            video.addEventListener('ended', () => {
                video.classList.add('hidden');
                if (overlayMain) {
                    // gsap.to(overlayMain, {
                    //     duration: 2,
                    //     opacity: 1,
                    //     scale: 1,
                    //     ease: 'slow(0.5,0.5,false)',
                    //     delay: 0.1
                    // });

                    gsap.fromTo(
                        overlayMain,
                        {
                            x: '-100%',
                        },
                        {
                            duration: 0.5,
                            x: '0%',
                            ease: 'power2.out',
                            delay: 0,
                            opacity: 1,
                        },
                    );
                }
                if (overlay) {
                    gsap.to(overlay, {
                        duration: 2,
                        opacity: 1,
                        ease: 'power2.out',
                        delay: 0.2,
                    });
                }
                gsap.to('.overlaybannehand-bottom', {
                    duration: 1.5,
                    bottom: '0px',
                    ease: 'power1.inOut',
                    delay: 0.1,
                });
                gsap.fromTo(
                    elements.logo,
                    { opacity: 0, y: -50 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 1 },
                );
                gsap.fromTo(
                    elements.title,
                    { opacity: 0, y: -50 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 1.5 },
                );
                gsap.fromTo(
                    elements.content,
                    { opacity: 0, y: -50 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 2 },
                );
                gsap.fromTo(
                    elements.button,
                    { opacity: 0, y: -50 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 2.5 },
                );
                gsap.to('.overlaybannehand-left', {
                    duration: 1,
                    left: '0px',
                    ease: 'power1.inOut',
                    delay: 3,
                });
                gsap.to('.overlaybannehand-right', {
                    duration: 1,
                    right: '0px',
                    ease: 'power1.inOut',
                    delay: 3,
                });
                gsap.fromTo(
                    elements.rotateText,
                    { opacity: 0, y: -50 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 4 },
                );
                gsap.fromTo(
                    elements.rotateText,
                    { text: '' },
                    {
                        text: data.bannerText,
                        duration: data.bannerText.length * 0.05,
                        ease: 'none',
                        delay: 4.5,
                    },
                );
                gsap.to('body', { delay: 3.5, onComplete: removeClass });

                gsap.fromTo(
                    '.banner_content_text p span.bold img.imgerasr_one',
                    {
                        y: '-100%',
                    },
                    {
                        duration: 0.5,
                        y: '0%',
                        ease: 'power2.out',
                        opacity: 1,
                        delay: 5,
                    },
                );

                gsap.fromTo(
                    '.banner_content_text p span.bold img.imgerasr_two',
                    {
                        y: '-100%',
                    },
                    {
                        duration: 0.5,
                        y: '0%',
                        ease: 'power2.out',
                        opacity: 1,
                        delay: 5.5,
                    },
                );


                gsap.fromTo(
                    '#target',
                    { drawSVG: "0 0", },
                    {
                        //opacity: 1,
                        // y: 0,
                        drawSVG: "100% -175%",
                        duration: 1,
                        ease: "none",
                        repeat: 0,
                        delay: 6
                    }
                );

                gsap.fromTo(
                    '#target_one',
                    { drawSVG: "0 0", },
                    {
                        //opacity: 1,
                        // y: 0,
                        drawSVG: "100% -175%",
                        duration: 1,
                        ease: "none",
                        repeat: 0,
                        delay: 6.5
                    }
                );

                gsap.fromTo(
                    '.rightsidebullets ul li',
                    { opacity: 0, y: -30 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.5,
                        duration: 1,
                        ease: 'power2.out',
                        delay: 5.5,
                    },
                );

                function removeClass() {
                    document.body.classList.remove('hiddenoverflow');
                }
            });
        }

        return () => {
            if (video) {
                video.removeEventListener('ended', () => { });
            }
        };
    }, [bannerData]);

    useEffect(() => {
        const paragraph = document.getElementById('text');
        if (paragraph) {
            const words = paragraph.innerText.split(' ');

            if (words.length >= 5) {
                words[1] = `<span class="bold"><svg version="1.0" x="0px" y="0px" viewBox="0 0 260 152" style="enable-background:new 0 0 260 152;" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:#FFFFFF;stroke-width:16;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><path id="target" class="st0" d="M16.8,61.9c0,0,44.4-36.5,79.7-53.5c0,0-70.3,59.4-88.2,85c0,0,86.5-72.4,190.3-85c0,0-103.5,72.1-162.7,116.5c0,0,142.1-77.5,215.9-105.5c0,0-88.2,73.7-115,98.4c0,0,55.9-34.7,79.7-39.1c0,0-6,23.4-48.5,65c0,0,16.3-15.1,41.8-23.5"/></svg> ${words[1]} </span>`;
                words[4] = `<span class="bold"><svg version="1.0" x="0px" y="0px" viewBox="0 0 260 152" style="enable-background:new 0 0 260 152;" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:#FFFFFF;stroke-width:16;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><path id="target_one" class="st0" d="M16.8,61.9c0,0,44.4-36.5,79.7-53.5c0,0-70.3,59.4-88.2,85c0,0,86.5-72.4,190.3-85c0,0-103.5,72.1-162.7,116.5c0,0,142.1-77.5,215.9-105.5c0,0-88.2,73.7-115,98.4c0,0,55.9-34.7,79.7-39.1c0,0-6,23.4-48.5,65c0,0,16.3-15.1,41.8-23.5"/></svg> ${words[4]} </span>`;
                paragraph.innerHTML = words.join(' ');
            }
        }
    }, [bannerData]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [bannerData]);

    if (loading)
        return (
            <div className="loadersite">
                <div className="logosvg">
                    <img src={bannerlogo} alt="logo" />
                </div>
                <div className="loader1">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        );
    if (error) return <div>{error}</div>;

    const placeholderData = {
        bannerVideo:
            'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        bannerLogo: {
            asset: {
                url: 'https://cdn.sanity.io/images/6tlmpa5b/production/57be1a377f95630454781e0f4b57c8f82ce20a4f-2374x1409.png',
            },
        },
        title: 'eCHTE VERSE HOLLANDSE FRIET',
        bannerContent:
            'Geen Franse friet of Vlaamse friet, bij Fabel Friet bakken wij echte Hollandse friet. Elke dag weer geven wij alles om de lekkerste friet van Amsterdam te bakken. Daarbij maken wij gebruik van de beste kwaliteit Agria aardappelen van Nederlandse bodem welke speciaal zijn ontwikkeld voor friet.',
        bannerButton: {
            buttonLink: '#',
            buttonText: 'Ontdek Fabel Friet',
        },
        bannerText: 'lekkerste friet van Amsterdam!',
        bannerImage: { asset: { url: '/path/to/placeholder/banner.jpg' } },
    };

    const data = {
        bannerVideo: bannerData?.bannerVideo || placeholderData.bannerVideo,
        bannerLogo: bannerData?.bannerLogo || placeholderData.bannerLogo,
        title: bannerData?.title || placeholderData.title,
        bannerContent: bannerData?.bannerContent || placeholderData.bannerContent,
        bannerButton: bannerData?.bannerButton || placeholderData.bannerButton,
        bannerText: bannerData?.bannerText || placeholderData.bannerText,
        bannerImage: bannerData?.bannerImage || placeholderData.bannerImage,
    };

    return (
        <section className="bannersection" id="section1">
            <div className="banner_video">
                {data.bannerVideo && (
                    <video
                        id="myVideo"
                        src={data.bannerVideo}
                        autoPlay
                        muted
                        playsInline
                    />
                )}
            </div>
            <div className="banner_overlaymain">
                <div className="banner_overlay">
                    <div className="bannerlogo">
                        <img src={data.bannerLogo.asset.url} alt="Logo" />
                    </div>

                    <div className="banner_title_text">
                        <h1>{data.title}</h1>
                    </div>

                    <div className="banner_content_text">
                        <p id="text">{data.bannerContent}</p>
                    </div>

                    {data.bannerButton && (
                        <a className="banner_bottombtn" href={data.bannerButton.buttonLink}>
                            {data.bannerButton.buttonText}
                        </a>
                    )}

                    <div className="bannerrotate_text">
                        <p>{data.bannerText}</p>
                    </div>
                </div>
                <div className="overlaybannehand">
                    <div className="overlaybannehand-left"></div>
                    <div className="overlaybannehand-right"></div>
                    <div className="overlaybannehand-bottom"></div>
                </div>
            </div>
        </section>
    );
};

export default HomePage;
