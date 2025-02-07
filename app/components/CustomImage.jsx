// import React, { useState } from 'react';
// const placeholderImage = "app/assets/elementor-placeholder-image.webp";
// const CustomImage = ({ src, alt, ...props }) => {
//   const [imageSrc, setImageSrc] = useState(src);
//   const handleError = () => {
//     setImageSrc(placeholderImage); 
//   };
//   return <img src={imageSrc} alt={alt} onError={handleError} {...props} />;
// };
// export default CustomImage;





import React, { useState } from 'react';
const placeholderImage = "path/to/placeholder-image.jpg";

const CustomImage = ({ src, alt, width, height, className, ...props }) => {
    const [imageSrc, setImageSrc] = useState(src);
    const handleError = () => {
        setImageSrc(placeholderImage);
    };
    return (
        <img
            src={imageSrc}
            alt={alt || 'Image not available'}
            onError={handleError}
            className={className}
            width={width}
            height={height}
            {...props}
        />
    );
};

export default CustomImage;
