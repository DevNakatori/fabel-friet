import React, { useEffect } from 'react';
import images from '../js/images';
import '../styles/SnowAnimation.scss';

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

const SnowAnimation = () => {
    useEffect(() => {
    }, []);
    const snowflakes = Array(30).fill(0).map(() => {
        const randomImage = fryImages[Math.floor(Math.random() * fryImages.length)];
        return randomImage;
    });

    return (
        <div className="snow-container">
            {snowflakes.map((image, index) => (
                <div key={index} className="snow">
                    <img src={image} alt="snowflake" className="snowflake-image" />
                </div>
            ))}
        </div>
    );
};

export default SnowAnimation;
