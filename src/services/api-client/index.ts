import axios from 'axios';

export const fetchAPI = async () => {
  const { data } = await axios.get(
    process.env.YOUTUBE_ITEMS_URL ??
      'https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json'
  );
  return data;
};
