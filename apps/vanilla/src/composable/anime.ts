import { api } from './API';
export const getAnime = async(limit: number, offset: number): Promise<IAnime> => {
  const { data } = await api.get(`anime/anime/?limit=${limit}&offset=${offset}`, {
    headers: {
      Accept: 'application/json',
    },
  });
  return data;
};
