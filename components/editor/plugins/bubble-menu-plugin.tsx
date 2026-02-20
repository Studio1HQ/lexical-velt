"use client";

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, SELECTION_CHANGE_COMMAND } from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Link } from 'lucide-react';

const LowPriority = 1;

export default function BubbleMenuPlugin() {
  const [editor] = useLexicalComposerContext();
  const bubbleMenuRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const updateBubbleMenu = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection) && !selection.isCollapsed()) {
      const nativeSelection = window.getSelection();
      const rootElement = editor.getRootElement();

      if (nativeSelection !== null && rootElement !== null && rootElement.contains(nativeSelection.anchorNode)) {
        const range = nativeSelection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setPosition({
          top: rect.top - 50,
          left: rect.left + rect.width / 2 - 80, // Center the bubble menu
        });
        
        setIsBold(selection.hasFormat('bold'));
        setIsItalic(selection.hasFormat('italic'));
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateBubbleMenu();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateBubbleMenu();
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, updateBubbleMenu]);

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  };

  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={bubbleMenuRef}
      className="bubble-menu fixed z-50 flex items-center gap-1 bg-background border rounded-lg shadow-lg p-1 animate-in fade-in-0 zoom-in-95 duration-200"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <Button
        variant={isBold ? "default" : "ghost"}
        size="sm"
        onClick={formatBold}
        className="h-8 w-8 p-0"
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        variant={isItalic ? "default" : "ghost"}
        size="sm"
        onClick={formatItalic}
        className="h-8 w-8 p-0"
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
      >
        <Link className="h-4 w-4" />
      </Button>
    </div>
  );
}