export default {
  resource: 'comments',
  beforeUpdate: async (params: any, dataProvider: any) => {
    return {
      ...params,
      data: {
        content: params.data.content,
      },
    };
  },
};
