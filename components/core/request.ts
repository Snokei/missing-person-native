import api from '@/api/axios';

export const getUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

export const login = async (payload: { phone: string; password: string }) => {
  const response = await api.post('/users/login', payload);
  return response;
};
