import api from '@/api/axios';

// LOGIN
export const login = async (payload: { phone: string; password: string }) => {
  const response = await api.post('/users/login', payload);
  return response;
};

// GET USERS
export const getUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

// GET LOCATION
export const getLocation = async (payload: any) => {
  const { data } = await api.post('/tracking', payload);
  return data;
};

// REGISTER PUSH TOKEN
export const registerPushToken = async (payload: {
  user_id: string | number;
  expo_push_token: string;
}) => {
  const { data } = await api.post('/users/token', payload);
  return data;
};
