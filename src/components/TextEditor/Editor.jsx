import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import '../style.css';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import {Color} from '@tiptap/extension-color'
import Link from "@tiptap/extension-link";
import Highlight from '@tiptap/extension-highlight';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import TextAlign from '@tiptap/extension-text-align'
import { useParams } from 'react-router-dom';
import { useEditorStore } from '../../store/use-editor-store';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family'
import {TextStyle} from '@tiptap/extension-text-style';
import FontSizeExtension from '../../extension/font-size'
import LineHeightExtension from "../../extension/Line-height"
import { Threads } from "./Threads";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import Rular from './Rular'

const Tiptap = () => {
  const { docId } = useParams();
  const { setEditor } = useEditorStore();
  const liveblocks = useLiveblocksExtension();
  const extensions = [
    liveblocks,
    StarterKit.configure({
      history:false
    }),
    Link.configure({
      openOnClick: true,
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
      
    }),
    TaskItem.configure({
      nested: true,
    }),
    Color,
    TaskList,
    Highlight.configure({
      multicolor:true
    }),
    Table,
    TableRow,
    TableHeader,
    TableCell,
    Underline,
    ImageResize,
    FontFamily,
    Image,
    TextStyle,
    TextAlign.configure({
      types:["heading","paragraph"]
    }),
    FontSizeExtension,
    LineHeightExtension.configure({
      types : ["heading","paragraph"],
      defaultHeight : "normal"
    })
  ];
  const editor = useEditor({
    autofocus:true,
    editorProps: {
      attributes: {
        style: 'padding-left:56px; padding-right:56px;',
        class:
        'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1050px] w-[816px] p-10 pr-14 pb-10 cursor-text',
      },
    },
    extensions,
        onCreate({ editor }) {
          setEditor(editor);
        },
        onDestroy(){
          setEditor(null)
        },
        onUpdate({editor}){
          setEditor(editor)
        },
        onSelectionUpdate({editor}){
          setEditor(editor)
        },
        onTransaction({editor}){
          setEditor(editor)
        },
        onFocus({editor}){
          setEditor(editor)
        },
        onBlur({editor}){
          setEditor(editor)
        },
        onContentError({editor}){
          setEditor(editor)
        }
      
        
  });

  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
      <Rular/>
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
     
    </div>
  );
};

export default Tiptap;
