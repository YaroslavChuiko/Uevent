export default {
  resource: 'promo-codes',
  beforeUpdate: async (params: any, _dataProvider: any) => {
    const { promoCode, discount } = params.data;
    const data = { promoCode, discount };

    return { ...params, data };
  },
};
