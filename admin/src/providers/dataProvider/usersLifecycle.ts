import httpClient from './httpClient';

async function updateAvatar(params: any) {
  const form = new FormData();
  form.append('avatar', params.data.avatar.rawFile);

  try {
    await httpClient(`${import.meta.env.VITE_SERVER_URL}/users/${params.id}/avatar`, {
      method: 'PUT',
      body: form,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default {
  resource: 'users',
  beforeUpdate: async (params: any, _dataProvider: any) => {
    if (params.data.avatar) {
      await updateAvatar(params);
    }

    const { login, fullName, email, role } = params.data;
    const data = { login, fullName, email, role };

    return { ...params, data };
  },
};
