import React from "react";
import Toolbar from "./Toolbar";
import Editor from "./Editor";
import Navbar from "./Navbar";
import { useEditorStore } from "@/store/use-editor-store";

const TextEditor = () => {
  const {editor} = useEditorStore()
 
  return (
    <div>
    <div className='flex flex-col px-4 pt-2 gap-y-3 fixed top-0 right-0 left-0 z-10 bg-[#FAFBFD] print:hidden'>
    <Navbar/>
    <Toolbar />
    </div>
    <div className='pt-[114px] print:pt-0'>
    <Editor />
    </div>
  </div>
  );
};

export default TextEditor;
