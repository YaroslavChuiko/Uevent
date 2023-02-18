import httpClient from './httpClient';

const eventsLifecycle = {
  resource: 'events',
  beforeUpdate: async (params: any, dataProvider: any) => {
    if (params.data.poster) {
      await updatePoster(params);
    }

    return {
      ...params,
      data: {
        name: params.data.name,
        description: params.data.description,
        price: params.data.price,
        ticketsAvailable: params.data.ticketsAvailable,
        latitude: params.data.latitude,
        longitude: params.data.longitude,
        isPublic: params.data.isPublic,
        isNotificationsOn: params.data.isNotificationsOn,
        date: params.data.date,
        publishDate: params.data.publishDate,
        formatId: params.data.formatId,
        themeId: params.data.themeId,
      },
    };
  },
};

const updatePoster = async (params: any) => {
  const form = new FormData();
  form.append('poster', params.data.poster.rawFile);
  const url = `${import.meta.env.VITE_SERVER_URL}/events/${params.id}/poster`;
  const options = { method: 'PUT', body: form };

  try {
    await httpClient(url, options);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default eventsLifecycle;
