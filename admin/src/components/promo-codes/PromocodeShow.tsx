import { NumberField, ReferenceField, Show, SimpleShowLayout, Tab, TabbedShowLayout, TextField } from 'react-admin';
import PromocodeTitle from './PromocodeTitle';

const PromocodeShow = () => (
  <Show title={<PromocodeTitle />}>
    <SimpleShowLayout>
      <NumberField source="id" />
      <TextField source="promoCode" />
      <NumberField source="discount" />
      <ReferenceField label="Event" source="eventId" reference="events">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export default PromocodeShow;
