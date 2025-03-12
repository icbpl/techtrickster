
import MarkdownContent from './MarkdownContent';
import MobileShareButtons from './MobileShareButtons';

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="col-span-12 lg:col-span-8">
      <MarkdownContent content={content} />
      <MobileShareButtons />
    </div>
  );
}
