import handleResponse from '../utils/handle-response';

const checkAuth = async () => {
  const resource = `${import.meta.env.VITE_SERVER_URL}/auth/refresh`;
  const request = new Request(resource, {
    method: 'POST',
    credentials: 'include',
  });

  try {
    checkAdmin();
    const response = await fetch(request);
    const { accessToken } = await handleResponse(response);
    localStorage.setItem('accessToken', accessToken);
    return Promise.resolve();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const checkAdmin = () => {
  const { role } = JSON.parse(localStorage.getItem('user') || '{}');

  if (role !== 'admin') {
    throw new Error('Only for admins');
  }
};

export default checkAuth;
