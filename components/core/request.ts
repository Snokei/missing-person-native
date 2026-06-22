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
  console.log(payload, 'payload');
  const { data } = await api.post('/tracking', payload);
  return data;
};
