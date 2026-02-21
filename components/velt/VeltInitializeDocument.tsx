"use client";

import { useEffect } from 'react';
import { useSetDocuments } from '@veltdev/react';

// [Velt] Initialize Velt document
export function useCurrentDocument() {
  const documentId = 'lexical-demo-doc';
  return { documentId };
}

export default function VeltInitializeDocument() {
  const { documentId } = useCurrentDocument();
  const documentName = 'Lexical Demo Document';

  const { setDocuments } = useSetDocuments();

  useEffect(() => {
    if (!documentId) return;
    setDocuments([
      { id: documentId, metadata: { documentName } },
    ]);
  }, [setDocuments, documentId]);

  return null;
}
