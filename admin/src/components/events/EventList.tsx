import {
  BooleanField,
  ChipField,
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from 'react-admin';

export const EventListDatagrid = () => (
  <Datagrid rowClick="show">
    <TextField source="id" />
    <TextField source="name" />
    <NumberField source="price" />
    <ReferenceField label="Company" source="companyId" reference="companies">
      <TextField source="name" />
    </ReferenceField>
    <ReferenceField label="Format" source="formatId" reference="formats">
      <ChipField source="name" />
    </ReferenceField>
    <ReferenceField label="Theme" source="themeId" reference="themes">
      <ChipField source="name" />
    </ReferenceField>
    <DateField source="date" showTime />
    <DateField source="publishDate" showTime />
    <BooleanField label="Public" source="isPublic" />
    <BooleanField label="Notifications" source="isNotificationsOn" />
  </Datagrid>
);

// filters={postFilters}
export const EventList = () => (
  <List>
    <EventListDatagrid />
  </List>
);
