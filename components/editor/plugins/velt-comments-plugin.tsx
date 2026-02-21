"use client";

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCommentAnnotations } from '@veltdev/react';
import { renderComments } from '@veltdev/lexical-velt-comments';
import { useEffect } from 'react';

export default function VeltCommentsPlugin() {
    const [editor] = useLexicalComposerContext();
    const annotations = useCommentAnnotations();

    useEffect(() => {
        if (editor && annotations) {
            renderComments({ editor, commentAnnotations: annotations });
        }
    }, [editor, annotations]);

    return null;
}
