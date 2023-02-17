import {
  BooleanField,
  ChipField,
  Datagrid,
  DateField,
  EditButton,
  NumberField,
  Pagination,
  ReferenceField,
  ReferenceManyField,
  RichTextField,
  Show,
  SimpleShowLayout,
  Tab,
  TabbedShowLayout,
  TextField,
} from 'react-admin';

export const EventShow = () => (
  <Show>
    <TabbedShowLayout spacing={2}>
      <Tab label="Summary">
        <SimpleShowLayout>
          <NumberField source="id" />
          <TextField source="name" />
          <ReferenceField label="Company" source="companyId" reference="companies">
            <TextField source="name" />
          </ReferenceField>
          <NumberField source="price" />
          <NumberField source="ticketsAvailable" />
          <NumberField source="latitude" />
          <NumberField source="longitude" />
          <ReferenceField label="Format" source="formatId" reference="formats">
            <ChipField source="name" />
          </ReferenceField>
          <ReferenceField label="Theme" source="themeId" reference="themes">
            <ChipField source="name" />
          </ReferenceField>
          <DateField label="Publication date" source="publishDate" locales="uk-UA" showTime />
          <DateField label="date" source="date" locales="uk-UA" showTime />
          <BooleanField label="Public" source="isPublic" />
          <BooleanField label="Notifications" source="isNotificationsOn" />
          <RichTextField source="description" />
        </SimpleShowLayout>
      </Tab>
      <Tab label="Comments" path="comments">
        <ReferenceManyField reference="comments" target="eventId" pagination={<Pagination />} label={false}>
          <Datagrid rowClick="show">
            <TextField source="id" />
            <ReferenceField source="eventId" reference="events" />
            <ReferenceField label="Author" source="userId" reference="users">
              <TextField source="login" />
            </ReferenceField>
            <TextField source="content" />
            <DateField label="Publication date" source="publishDate" locales="uk-UA" showTime />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
