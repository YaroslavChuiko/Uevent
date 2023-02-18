import { useState, useEffect } from 'react';
import { Edit, SimpleForm, TextInput, Toolbar, SaveButton, DeleteButton, useRecordContext, Identifier } from 'react-admin';
import { createUpdateSchema } from '../../validation/formats-themes';
import Title from './Title';
import httpClient from '../../providers/dataProvider/httpClient';

const EditToolbar = ({ modelName }: { modelName: string }) => {
  const [disabled, setDisabled] = useState(false);
  const record = useRecordContext();

  useEffect(() => {
    getEvents(record.id)
    .catch(error => {
      throw new Error(error.message);
    });
  }, []);

  return (
    <Toolbar
      sx={{ justifyContent: 'space-between' }}>
      <SaveButton/>
      <DeleteButton disabled={disabled} />
    </Toolbar>
  );

  async function getEvents(id: Identifier) {
    const params = new URLSearchParams();
    params.append(`${modelName}Id`, `${id}`);

    const response = await httpClient(`${import.meta.env.VITE_SERVER_URL}/events?` + params, {
      method: 'GET',
    });
    setDisabled(!!response.json.length);
  }
};

const FormatThemeEdit = ({ modelName }: { modelName: string }) => (
  <Edit title={<Title modelName={modelName} />}>
    <SimpleForm resolver={createUpdateSchema} toolbar={<EditToolbar modelName={modelName} />}>
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);

export const FormatEdit = <FormatThemeEdit modelName='format' />;
export const ThemeEdit = <FormatThemeEdit modelName='theme' />;

