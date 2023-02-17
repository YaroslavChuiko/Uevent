const checkError = async (error: any) => {
  const status = error.status;

  if (status === 401 || status === 403) {
    return Promise.reject({ logoutUser: true });
  }

  return Promise.resolve();
};

export default checkError;
