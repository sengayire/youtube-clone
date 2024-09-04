import axios from 'axios';

export const fetchAPI = async () => {
  const url = process.env.YOUTUBE_ITEMS_URL;

  if (!url) {
    throw new Error(
      'YOUTUBE_ITEMS_URL is not defined in the environment variables.'
    );
  }
  const { data } = await axios.get(url);
  return data;
};
