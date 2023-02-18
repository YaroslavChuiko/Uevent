async function beforeUpdate (params: any, dataProvider: any) {
	return {
		...params,
		data: {
			name: params.data.name,
		},
	};
}

export const formatsLifecycle = {
  resource: 'formats',
  beforeUpdate: beforeUpdate,
};

export const themesLifecycle = {
  resource: 'themes',
  beforeUpdate: beforeUpdate,
};

