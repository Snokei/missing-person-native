// hooks/useUsers.ts

import { useQuery } from '@tanstack/react-query';
import { GET_LOCATION } from 'components/core/generalConst';
import { getLocation } from 'components/core/request';

export const useTracking = (payload: any) => {
  const { data, isFetching, error } = useQuery({
    queryKey: [GET_LOCATION, payload],
    queryFn: () => getLocation(payload),
    enabled: !!payload?.latitude,
  });
  return { data, isFetching, error };
};
