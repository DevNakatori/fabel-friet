import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import images from '../js/images';
import '../styles/frenchfriesrain.css';

const fryImages = [
    images.one,
    images.two,
    images.three,
    images.four,
    images.five,
    images.six,
    images.seven,
    images.eight,
    images.nine,
    images.ten
];

const FrenchFriesRain = () => {
    const friesContainerRef = useRef(null);
    const lastUsedImage = useRef(null);

    useEffect(() => {
        const friesContainer = friesContainerRef.current;
        const containerHeight = friesContainer.offsetHeight; 

        function createFry() {
            const fry = document.createElement('img');
            fry.classList.add('fry');
            let randomImage;
            do {
                randomImage = fryImages[Math.floor(Math.random() * fryImages.length)];
            } while (randomImage === lastUsedImage.current);
            fry.src = randomImage;

            const leftPosition = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 20; // Speed random between 2 to 5 seconds
            const delay = Math.random() * 2;
            const rotation = Math.random() * 360;
            const drift = Math.random() * 20 - 10;
            fry.style.left = `${leftPosition}%`;
            fry.style.transform = `rotate(${rotation}deg) translateX(${drift}px)`;
            friesContainer.appendChild(fry);
            lastUsedImage.current = randomImage;

            gsap.fromTo(
                fry,
                {
                    y: -100, 
                    opacity: 1,
                    rotation: rotation,
                    x: drift,
                },
                {
                    y: containerHeight + 100,
                    opacity: 1,
                    rotation: rotation + (Math.random() * 20 - 10),
                    x: drift + (Math.random() * 20 - 5),
                    duration: animationDuration, // Random duration for each fry
                    delay: delay,
                    ease: 'slow(0.7,0.7,false)',
                    onComplete: () => fry.remove(),
                }
            );
        }

        const friesInterval = setInterval(createFry, 250);
        return () => clearInterval(friesInterval);
    }, []);

    return (
        <div className="fries-containerfries">
            <div className="fries-containerfriesinne" ref={friesContainerRef}></div>
        </div>
    );
};

export default FrenchFriesRain;
