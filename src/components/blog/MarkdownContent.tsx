
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      className={cn(
        'prose prose-lg max-w-none dark:prose-invert prose-headings:mb-4 prose-p:mb-4 prose-pre:rounded-lg prose-pre:bg-muted prose-pre:border prose-pre:border-border',
        className
      )}
      components={{
        // Add custom rendering for specific markdown elements if needed
        h1: ({ node, ...props }) => <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-xl md:text-2xl font-bold mt-6 mb-3" {...props} />,
        a: ({ node, ...props }) => (
          <a 
            className="text-primary hover:underline transition-colors" 
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props} 
          />
        ),
        code: ({ node, ...props }) => {
          const isInline = typeof props.children === 'string';
          return isInline 
            ? <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
            : <code className="block bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono" {...props} />;
        },
        pre: ({ node, ...props }) => (
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto border border-border mt-4 mb-6" {...props} />
        ),
        img: ({ node, ...props }) => (
          <img 
            className="rounded-lg border border-border my-6 max-w-full h-auto"
            loading="lazy"
            {...props} 
          />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic my-6" {...props} />
        )
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
