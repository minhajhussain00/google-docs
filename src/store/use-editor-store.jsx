import { create } from "zustand";
import { Editor } from "@tiptap/react";

export const useEditorStore = create((set) => ({
  editor: null || Editor,
  setEditor: (editor) => set({ editor }),
}));