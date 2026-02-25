"use client";
import { VeltSidebarButton } from "@veltdev/react";
import { useTheme } from "next-themes";

function VeltTools() {
  const { theme } = useTheme();
  return (
    <>
      <VeltSidebarButton darkMode={theme === "dark"} />
    </>
  );
}

export default VeltTools;
