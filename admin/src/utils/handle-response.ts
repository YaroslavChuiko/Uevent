const handleResponse = async (response: Response) => {
  const data = await response.json();

  if (response.status < 200 || response.status >= 300) {
    throw new Error(data.message);
  }

  return data;
};

export default handleResponse;
