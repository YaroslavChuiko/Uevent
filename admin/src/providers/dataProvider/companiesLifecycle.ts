import httpClient from './httpClient';

async function updateAvatar(params: any) {
  const form = new FormData();
  form.append('avatar', params.data.avatar.rawFile);

  try {
    await httpClient(`${import.meta.env.VITE_SERVER_URL}/companies/${params.id}/avatar`, {
      method: 'PUT',
      body: form,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default {
  resource: 'companies',
  beforeUpdate: async (params: any, dataProvider: any) => {
    if (params.data.avatar) {
      await updateAvatar(params);
    }

    return {
      ...params,
      data: {
        name: params.data.name,
        email: params.data.email,
        latitude: params.data.latitude,
        longitude: params.data.longitude,
      },
    };
  },
};
