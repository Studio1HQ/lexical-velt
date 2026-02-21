import { VeltComments, VeltCommentsSidebar, VeltPresence, VeltCursor } from "@veltdev/react";
import VeltInitializeDocument from "./VeltInitializeDocument";

export function VeltCollaboration() {
  return (
    <>
      <VeltInitializeDocument />
      <VeltCursor />
      <VeltComments
        popoverMode={true}
        shadowDom={false}
        textMode={false}
        commentPinHighlighter={false}
        dialogOnHover={false}
      />
      <VeltCommentsSidebar groupConfig={{ enable: false }} />
    </>
  );
}

export default VeltCollaboration;
