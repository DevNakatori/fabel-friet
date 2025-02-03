import React, {useEffect, useState} from 'react';
import {client} from '../../sanityClient';

const Allmedia = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const query = `*[_type == "media"]{
      bannerLogo{
        asset->{url}
      },
      bannerVideo,
      dustbinImage{
        asset->{url}
      },
      getintouchimage{
        asset->{url}
      },
      hetmenu_image{
        asset->{url}
      },
      image{
        asset->{url}
      },
      location_image{
        asset->{url}
      },
      onzebootomimage{
        asset->{url}
      },
      onzeimpactimage{
        asset->{url}
      },
      qrImage{
        asset->{url}
      },
      three_image[]{
        asset->{url}
      },
      videoLink
    }`;

    client
      .fetch(query)
      .then((result) => {
        setData(result[0]);
      })
      .catch((error) => {
        console.error('Error fetching data from Sanity:', error);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.bannerLogo && (
        <img src={data.bannerLogo.asset.url} alt="Banner Logo" />
      )}

      {data.bannerVideo && <video controls src={data.bannerVideo}></video>}

      {data.dustbinImage && (
        <img src={data.dustbinImage.asset.url} alt="Dustbin" />
      )}

      {data.getintouchimage && (
        <img src={data.getintouchimage.asset.url} alt="Get In Touch" />
      )}

      {data.hetmenu_image && (
        <img src={data.hetmenu_image.asset.url} alt="Het Menu" />
      )}

      {data.image && <img src={data.image.asset.url} alt="Banner" />}

      {data.location_image && (
        <img src={data.location_image.asset.url} alt="Location" />
      )}

      {data.onzebootomimage && (
        <img src={data.onzebootomimage.asset.url} alt="Bottom Image" />
      )}

      {data.onzeimpactimage && (
        <img src={data.onzeimpactimage.asset.url} alt="Impact" />
      )}

      {data.qrImage && <img src={data.qrImage.asset.url} alt="QR Code" />}

      {data.three_image &&
        data.three_image.map((img, index) => (
          <img
            key={index}
            src={img.asset.url}
            alt={`Three Image ${index + 1}`}
          />
        ))}

      {data.videoLink && <video controls src={data.videoLink}></video>}
    </div>
  );
};

export default Allmedia;
