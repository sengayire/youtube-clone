import axios from 'axios';

/**
 * Api fetch function
 * @returns array of video

*/
export const fetchAPI = async () => {
  const url = process.env.DATA_SOURCE_URL;

  if (!url) {
    throw new Error(
      'DATA_SOURCE_URL is not defined in the environment variables.'
    );
  }
  const { data } = await axios.get(url);

  return data;
};
