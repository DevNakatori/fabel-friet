import React, { useEffect } from 'react';
import images from '../js/images';
import '../styles/SnowAnimations.scss';

const fryImagess = [
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

const snowsAnimations = () => {
    useEffect(() => {
    }, []);
    const snowsflakess = Array(80).fill(0).map(() => {
        const randomImages = fryImagess[Math.floor(Math.random() * fryImagess.length)];
        return randomImages;
    });

    return (
        <div className="snows-containers">
            {snowsflakess.map((image, index) => (
                <div key={index} className="snows">
                    <img src={image} alt="snowsflake" className="snowsflake-images" />
                </div>
            ))}
        </div>
    );
};

export default snowsAnimations;
