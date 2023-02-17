const getIdentity = () => {
  try {
    const { id, fullName, picturePath } = JSON.parse(localStorage.getItem('user') || '{}');
    return Promise.resolve({ id, fullName, avatar: `${import.meta.env.VITE_SERVER_URL}/${picturePath}` });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default getIdentity;
