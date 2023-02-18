import { Datagrid, List, TextField, TextInput, EditButton } from 'react-admin';

const filters = [<TextInput source="q" label="Search" alwaysOn />];

const FormatThemesList = () => (
	<List filters={filters}>
		<Datagrid rowClick="show">
			<TextField source="id" />
			<TextField source="name" />
			<EditButton />
		</Datagrid>
	</List>
);

export default FormatThemesList;

