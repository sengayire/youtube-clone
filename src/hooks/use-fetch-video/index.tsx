import { fetchAPI } from '@/services';
import { useQuery } from '@tanstack/react-query';

export default function useFetchVideo() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchAPI,
  });
  return {
    data,
    error,
    isLoading,
  };
}
