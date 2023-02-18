import { Create, SimpleForm, TextInput } from 'react-admin';
import { createUpdateSchema } from '../../validation/formats-themes';

export const FormatThemeCreate = () => (
	<Create redirect="show">
		<SimpleForm resolver={createUpdateSchema}>
			<TextInput source="name" />
		</SimpleForm>
	</Create>
);

export default FormatThemeCreate;

