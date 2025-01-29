import { useState, useEffect } from 'react';

const useInstagramFeed = (accessToken, limit = 10) => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstagramFeed = async () => {
        try {
          const response = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,thumbnail_url&access_token=${accessToken}&limit=${limit}`
          );
      
          if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Detailed Instagram API Error:', errorMessage);
            throw new Error(`Error fetching Instagram feed: ${errorMessage}`);
          }
      
          const data = await response.json();
      
          if (data && data.data) {
            setFeed(data.data);
          } else {
            throw new Error('Invalid Instagram data format.');
          }
        } catch (err) {
          console.error('Instagram API Error:', err);
          setError(err.message || 'Failed to fetch Instagram feed.');
        } finally {
          setLoading(false);
        }
      };
      

    fetchInstagramFeed();
  }, [accessToken, limit]);

  return { feed, loading, error };
};

export default useInstagramFeed;
