import { useMemo } from 'react';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/react';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/react/style.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  editable?: boolean;
}

export function RichTextEditor({ value, onChange, editable = true }: RichTextEditorProps) {
  const initialContent = useMemo(() => {
    if (!value) return undefined;
    try {
      return JSON.parse(value) as PartialBlock[];
    } catch {
      // If it's plain text, convert to block
      return [
        {
          type: "paragraph" as const,
          content: value,
        },
      ];
    }
  }, []);

  const editor = useMemo(() => {
    return BlockNoteEditor.create({
      initialContent,
    });
  }, []);

  const handleChange = () => {
    const blocks = editor.document;
    const jsonString = JSON.stringify(blocks);
    onChange(jsonString);
  };

  return (
    <div className="blocknote-editor">
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={handleChange}
        theme="dark"
      />
    </div>
  );
}

// Simple text preview for task cards
export function DescriptionPreview({ value }: { value: string }) {
  if (!value) return null;
  
  try {
    const blocks = JSON.parse(value);
    const textContent = blocks
      .map((block: { content?: Array<{ text?: string } | string> | string }) => {
        if (typeof block.content === 'string') return block.content;
        if (Array.isArray(block.content)) {
          return block.content
            .map((item: { text?: string } | string) => (typeof item === 'string' ? item : item.text || ''))
            .join('');
        }
        return '';
      })
      .join(' ')
      .slice(0, 100);
    
    return <span className="description-preview">{textContent}{textContent.length >= 100 ? '...' : ''}</span>;
  } catch {
    return <span className="description-preview">{value.slice(0, 100)}</span>;
  }
}
