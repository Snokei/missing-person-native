// hooks/useRegisterPushToken.ts

import { useMutation } from '@tanstack/react-query';
import { REGISTER_PUSH_TOKEN } from 'components/core/generalConst';
import { registerPushToken } from 'components/core/request';
import { registerForPushNotifications } from '@/utils/pushNotifications';

export const useRegisterPushToken = () => {
  const mutation = useMutation({
    mutationKey: [REGISTER_PUSH_TOKEN],
    mutationFn: registerPushToken,
  });

  const register = async (userId: string | number) => {
    const expoPushToken = await registerForPushNotifications();

    if (!expoPushToken) return;

    return mutation.mutateAsync({
      user_id: userId,
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