import { useRecordContext } from 'react-admin';

const CommentTitle = () => {
  const record = useRecordContext();
  let title = record ? record.content : '';
  if (title.length > 30) {
    title = title.slice(0, 30) + '...';
  }
  return <span>Comment : {title}</span>;
};

export default CommentTitle;
