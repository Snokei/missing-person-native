// hooks/useUsers.ts

import { useQuery } from '@tanstack/react-query';
import { MISSING_PERSONS_API } from 'components/core/generalConst';
import { getUsers } from 'components/core/request';

export const useUsers = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: [MISSING_PERSONS_API],
    queryFn: getUsers,
    select: (response) => {
      const data = response.data || [];
      return data.map((user: any) => ({
        ...user,
        name: `${user.first_name} ${user.last_name}`,
      }));
    },
  });
  return { data, isFetching, error };
};
