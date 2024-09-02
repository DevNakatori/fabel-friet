import { useEffect, useState } from 'react';
import { client } from '../../sanityClient';
import '../styles/homebanner.css';

const HomePage = () => {
    const [bannerData, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    //if data not available set Placeholder data
    const placeholderData = {
        bannerVideo:
            'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        bannerLogo: {
            asset: {
                url: 'https://s3-alpha-sig.figma.com/img/57be/1a37/7f95630454781e0f4b57c8f82ce20a4f?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iVACNWhTCdzeHzEUkslta3hlif2gfrPmmdaYZx6mVG2mCdSpceGidh7-GaXeFHGrCuTCJcymKspqrOdXr08oYdSOdLET~rxg-2q-jZbj6yJyproC9vLXnmUm9CzNIYIf2bB9MrqDm2PxoEeHL4MwszwFlTnr~0rznBIrs11-yZiMTet7yLqLA19XdrARZqECgkTGUhF75t8luy9AHy-ZPmdVv0gNPFa3OqSQOgJ~4FadCxNNpFk87jHzXlmtRI6ig3okYjzApOsJo1HoSJfSa8FlLDN5CqngDhw5VHYCNzS2EqYPKvqMcVwjIgsUWrkkfnYXZaVZTV8gz78ORYgk8g__',
            },
        },
        bannerTitle: 'eCHTE VERSE HOLLANDSE FRIET',
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
        <section>
            <div className="banner_video">
                {/* {data.bannerVideo && <video src={data.bannerVideo} autoPlay muted />} */}

                <div className="banner_overlay">
                    <div className="bannerlogo">
                        <img src={data.bannerLogo.asset.url} alt="Logo" />
                    </div>

                    <div className="banner_title_text">
                        <h1>{data.title}</h1>
                    </div>

                    <div className="banner_content_text">
                        <p>{data.bannerContent}</p>
                    </div>

                    {data.bannerButton && (
                        <a className="banner_bottombtn" href={data.bannerButton.buttonLink}>
                            {data.bannerButton.buttonText}
                        </a>
                    )}
                </div>
                {/* <p>{data.bannerText}</p> */}
                {/* <img src={data.bannerImage.asset.url} alt="Banner" /> */}
            </div>
        </section>
    );
};

export default HomePage;
