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

// filters={postFilters}
export const EventList = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField label="Company" source="companyId" reference="companies">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="price" />
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
  </List>
);
