import { useRecordContext } from 'react-admin';

const ContentField = (props: any) => {
  const record = useRecordContext();
  if (!record) return null;
  let content = record[props.source];
  if (content.length > 200) {
    content = content.slice(0, 200) + '...';
  }
  return <span>{content}</span>;
};

export { ContentField };
