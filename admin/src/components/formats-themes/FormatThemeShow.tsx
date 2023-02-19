import { ReferenceManyField, Pagination, Show, TabbedShowLayout, Tab, TextField } from 'react-admin';
import Title from './Title';
import EventDatagrid from '../events/EventDatagrid';

const FormatThemeShow = ({ modelName }: { modelName: string }) => (
  <Show title={<Title modelName={modelName} />}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <TextField source="id" />
        <TextField source="name" />
      </Tab>
      <Tab label="Events">
        <ReferenceManyField reference="events" target={`${modelName}Id`} pagination={<Pagination />} label={false}>
          <EventDatagrid />
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export const FormatShow = <FormatThemeShow modelName="format" />;
export const ThemeShow = <FormatThemeShow modelName="theme" />;
