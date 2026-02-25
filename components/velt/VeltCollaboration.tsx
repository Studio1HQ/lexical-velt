import { VeltComments, VeltCommentsSidebar, VeltPresence, VeltCursor } from "@veltdev/react";
import VeltInitializeDocument from "./VeltInitializeDocument";
import { useTheme } from "next-themes";

export function VeltCollaboration() {
  const { theme } = useTheme();
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
        darkMode={theme === "dark"}
      />
      <VeltCommentsSidebar groupConfig={{ enable: false }} darkMode={theme === "dark"} />
    </>
  );
}

export default VeltCollaboration;
