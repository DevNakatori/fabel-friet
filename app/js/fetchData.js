import { client } from '../../sanityClient'
const fetchAllData = async (language) => {
    try {
        const [bannerData, onzefrietData, onzelocatiesData, hetmenuData] = await Promise.all([
            client.fetch(`*[_type == "homebanner" && language == $lang]`, { lang: language }),
            client.fetch(`*[_type == "onzefriet" && language == $lang]`, { lang: language }),
            client.fetch(`*[_type == "onzelocaties" && language == $lang]`, { lang: language }),
            client.fetch(`*[_type == "hetmenu" && language == $lang]`, { lang: language })
        ]);
        console.log(bannerData);
        console.log(onzefrietData);
        console.log(onzelocatiesData);
        console.log(hetmenuData);

        return { bannerData, onzefrietData, onzelocatiesData, hetmenuData };
        
    } catch (err) {
        throw new Error('Failed to load data: ' + err.message);
    }
};

export default fetchAllData;
