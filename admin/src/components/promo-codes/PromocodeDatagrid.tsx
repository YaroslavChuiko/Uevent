import { Datagrid, NumberField, ReferenceField, TextField } from 'react-admin';

const PromocodeDatagrid = () => (
  <Datagrid rowClick="show">
    <NumberField source="id" />
    <TextField source="promoCode" />
    <NumberField source="discount" />
    <ReferenceField label="Event" source="eventId" reference="events">
      <TextField source="name" />
    </ReferenceField>
  </Datagrid>
);

export default PromocodeDatagrid;
