"use client";

import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';

import ToolbarPlugin from './plugins/toolbar-plugin';
import BubbleMenuPlugin from './plugins/bubble-menu-plugin';
import VeltCommentsPlugin from './plugins/velt-comments-plugin';
import { CommentNode } from '@veltdev/lexical-velt-comments';


const theme = {
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'editor-placeholder',
  paragraph: 'editor-paragraph',
  quote: 'editor-quote',
  heading: {
    h1: 'editor-heading-h1',
    h2: 'editor-heading-h2',
    h3: 'editor-heading-h3',
    h4: 'editor-heading-h4',
    h5: 'editor-heading-h5',
  },
  list: {
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
    listitem: 'editor-listitem',
  },
  image: 'editor-image',
  link: 'editor-link',
  text: {
    bold: 'editor-text-bold',
    italic: 'editor-text-italic',
    overflowed: 'editor-text-overflowed',
    hashtag: 'editor-text-hashtag',
    underline: 'editor-text-underline',
    strikethrough: 'editor-text-strikethrough',
    underlineStrikethrough: 'editor-text-underlineStrikethrough',
    code: 'editor-text-code',
  },
  code: 'editor-code',
  codeHighlight: {
    atrule: 'editor-tokenAttr',
    attr: 'editor-tokenAttr',
    boolean: 'editor-tokenProperty',
    builtin: 'editor-tokenSelector',
    cdata: 'editor-tokenComment',
    char: 'editor-tokenSelector',
    class: 'editor-tokenFunction',
    'class-name': 'editor-tokenFunction',
    comment: 'editor-tokenComment',
    constant: 'editor-tokenProperty',
    deleted: 'editor-tokenProperty',
    doctype: 'editor-tokenComment',
    entity: 'editor-tokenOperator',
    function: 'editor-tokenFunction',
    important: 'editor-tokenVariable',
    inserted: 'editor-tokenSelector',
    keyword: 'editor-tokenAttr',
    namespace: 'editor-tokenVariable',
    number: 'editor-tokenProperty',
    operator: 'editor-tokenOperator',
    prolog: 'editor-tokenComment',
    property: 'editor-tokenProperty',
    punctuation: 'editor-tokenPunctuation',
    regex: 'editor-tokenVariable',
    selector: 'editor-tokenSelector',
    string: 'editor-tokenSelector',
    symbol: 'editor-tokenProperty',
    tag: 'editor-tokenProperty',
    url: 'editor-tokenOperator',
    variable: 'editor-tokenVariable',
  },
};

function Placeholder() {
  return (
    <div className="editor-placeholder absolute top-4 left-4 text-muted-foreground pointer-events-none">
      Start writing your story...
    </div>
  );
}

function initialEditorState() {
  const root = $getRoot();
  if (root.getFirstChild() === null) {
    const heading = $createHeadingNode('h1');
    heading.append($createTextNode('The Future of Collaborative Writing'));
    root.append(heading);

    const p1 = $createParagraphNode();
    p1.append($createTextNode('Welcome to WriteFlow, where creativity meets collaboration. This advanced rich text editor is built on Lexical and powered by Velt, allowing you to seamlessly collaborate with your team in real-time.'));
    root.append(p1);

    const quote = $createQuoteNode();
    quote.append($createTextNode('Collaboration is the essence of great stories. When we write together, we bring diverse perspectives that enrich every word.'));
    root.append(quote);

    const p2 = $createParagraphNode();
    p2.append($createTextNode('Try selecting any part of this text to see the floating bubble menu. You can add comments, format text, and see other users cursors moving in real-time. User presence is visible in the top navigation bar, keeping everyone connected.'));
    root.append(p2);
  }
}

const editorConfig = {
  namespace: 'WriteFlow',
  theme,
  editorState: initialEditorState,
  onError(error: any) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    CommentNode,
  ],
};

export function LexicalEditor() {
  return (
    <div className="relative">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container relative border rounded-lg overflow-hidden">
          <ToolbarPlugin />
          <div className="editor-inner relative">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="editor-input min-h-[400px] p-4 outline-none focus:outline-none" />
              }
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <BubbleMenuPlugin />
            <VeltCommentsPlugin />
            <HistoryPlugin />
            <ListPlugin />
            <LinkPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <OnChangePlugin onChange={(editorState) => {
              // Handle content changes if needed
            }} />
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
}