// hooks/useRegisterPushToken.ts

import { registerForPushNotifications } from '@/utils/pushNotifications';
import { useMutation } from '@tanstack/react-query';
import { REGISTER_PUSH_TOKEN } from 'components/core/generalConst';
import { registerPushToken } from 'components/core/request';

export const useRegisterPushToken = () => {
  const mutation = useMutation({
    mutationKey: [REGISTER_PUSH_TOKEN],
    mutationFn: registerPushToken,
  });

  const register = async (data: any) => {
    const { expo_push_token, id } = data || {};
    const expoPushToken = await registerForPushNotifications();

    if (!expoPushToken) return;

    if (expo_push_token === expoPushToken) return;
    return mutation.mutateAsync({
      user_id: id,
      expo_push_token: expoPushToken,
    });
  };

  return {
    register,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
