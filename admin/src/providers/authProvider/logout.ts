import handleResponse from '../../utils/handle-response';

const logout = async () => {
  const resource = `${import.meta.env.VITE_SERVER_URL}/auth/logout`;
  const request = new Request(resource, {
    method: 'POST',
    credentials: 'include',
  });

  try {
    const response = await fetch(request);
    await handleResponse(response);
  } catch (error) {
    // throw new Error('Network error');
  }
};

export default logout;
