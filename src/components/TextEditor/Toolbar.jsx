import React from 'react';
import { Undo2Icon,
    Redo2Icon,
    PrinterIcon,
    SpellCheck,
    BoldIcon,
    Italic,
    Underline,
    MessageSquarePlusIcon,
    ListTodoIcon,
    RemoveFormattingIcon,
    ChevronDownIcon,
    HighlighterIcon,
    Link2Icon,
    ImageIcon,
    UploadIcon,
    SearchIcon,
    AlignLeftIcon,
    AlignCenterIcon,
    AlignRightIcon,
    AlignJustifyIcon,
    ListIcon,
    ListOrderedIcon,
    MinusIcon,
    PlusIcon,
    ListCollapseIcon,
 } from 'lucide-react';
import { useEditorStore } from '../../store/use-editor-store';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem
} from '../ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle

} from "../ui/dialog"
import {Input} from '../ui/input'
import { Button } from '../ui/button';
import {cn} from '../../lib/utils'
import {useState,useCallback} from 'react'
import { CirclePicker,SketchPicker } from "react-color";
import { set } from 'date-fns';

const sections = [
  {
    label: 'Undo',
    icon: Undo2Icon,
    onClick: (editor) => editor?.chain().focus().undo().run(),
  },
  {
    label: 'Redo',
    icon: Redo2Icon,
    onClick: (editor) => editor?.chain().focus().redo().run(),
  },
  {
    label: 'Print',
    icon: PrinterIcon,
    onClick: () => window.print(),
  },
  {
    label: 'Spell Check',
    icon: SpellCheck,
    onClick: (editor) => {
      const current  = editor?.view.dom.getAttribute("spellcheck")
      editor?.view.dom.setAttribute("spellcheck",current==="false"?"true":"false")

    },
  },
  
];
const section2 =[
  {
    label: 'Bold',
    isActive: (editor) => editor.isActive('bold'),
    icon: BoldIcon,
    onClick: (editor) => editor.chain().focus().toggleBold().run(),
  },
  {
    label: 'italic',
    isActive: (editor) => editor.isActive('italic'),
    icon: Italic,
    onClick: (editor) => editor.chain().focus().toggleItalic().run(),
  },
  {
    label: 'UnderLine',
    isActive: (editor) => editor.isActive('underLine'),
    icon: Underline,
    onClick: (editor) => editor.chain().focus().toggleUnderline().run(),
  },
 
]
const section3 =[
  {
    label: 'Comment',
    isActive: (editor) => editor?.isActive("liveblocksCommentMark"),
    icon: MessageSquarePlusIcon,
    onClick: (editor) =>editor?.chain().focus().addPendingComment().run(),
  },
  {
    label: 'TodoList',
    isActive: (editor) => editor.isActive('todoList'),
    icon: ListTodoIcon,
    onClick: (editor) =>  editor.chain().focus().toggleTaskList().run(),
  },
  {
    label: 'RemoveFormatting',
    icon: RemoveFormattingIcon,
    onClick: (editor) =>  editor.chain().focus().unsetAllMarks().run(),
  },
]
const fonts = [
  { label: 'Arial', value: 'Arial' },
  { label: 'Times New Roman', value: 'Times New Roman' },
  { label: 'Verdana', value: 'Verdana' },
  { label: 'Courier New', value: 'Courier New' },
  { label: 'Georgia', value: 'Georgia' },
  
];
const heading = [
  {label:"Normal text", value:0, fontSize :"17px"},
  {label:"Heading 1" , value:1, fontSize :"32px"},
  {label:"Heading 2" , value:2, fontSize :"24px"},
  {label:"Heading 3" , value:3, fontSize :"20px"},
  {label:"Heading 4" , value:4, fontSize :"18px"},
  {label:"Heading 5" , value:5, fontSize :"16px"},

]
const alignments = [
  { label: "Align Left", value: "left", icon: AlignLeftIcon },
  { label: "Align Center", value: "center", icon: AlignCenterIcon },
  { label: "Align Right", value: "right", icon: AlignRightIcon },
  { label: "Justify", value: "justify", icon: AlignJustifyIcon },
];
const listOptions = [
  { label: "Bullet List", command: "toggleBulletList", isActive: "bulletList", icon: ListIcon },
  { label: "Numbered List", command: "toggleOrderedList", isActive: "orderedList", icon: ListOrderedIcon },
];
const LineHeight = [
  {label:"Default", value:"normal"},
  {label:"Single", value:"1"},
  {label:"1.15", value:"1.15"},
  {label:"1.5", value:"1.5"},
  {label:"Double", value:"2"},
]
const ListButton = ()=>{
  const { editor } = useEditorStore();
  if (!editor) return null;

  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 p-2 text-sm">
          <ListIcon  />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {listOptions.map(({ label, command, isActive, icon: Icon }) => (
          <button
            key={command}
            onClick={() => editor.chain().focus()[command]().run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-2 rounded-sm hover:bg-neutral-200/80",
              editor?.isActive?.(isActive) && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const LineHeightButton = () => {
  const { editor } = useEditorStore();

  if (!editor) return null;


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-2 text-sm">
          <ListCollapseIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {LineHeight.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run() }
            className={cn(
              "flex items-center gap-x-2 px-2 py-2 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes?.("paragraph").LineHeight===value && "bg-neutral-200/80"
            )}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};




const FontSizeMenu = () => {
  const { editor } = useEditorStore();
  if (!editor) return null;

  const currentFontSize = editor?.getAttributes?.("textStyle").fontSize
    ? editor?.getAttributes?.("textStyle").fontSize.replace("px", "")
    : "17";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.chain().focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrement}
        className="h-7 w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 "
      >
        <MinusIcon className="size-3" />
      </button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange} 
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-7 w-10 text-sm border text-black border-neutral-400 text-center rounded-sm bg-transparent focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="h-7 w-10 text-sm border text-black border-neutral-400 text-center rounded-sm cursor-text bg-transparent "
        >
          {currentFontSize}
        </button>
      )}
      <button
        onClick={increment}
        className="h-7 w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 "
      >
        <PlusIcon className="size-3" />
      </button>
    </div>
  );
};


const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  if (!editor) return null;

  const onChange = useCallback((src) => {
    editor.chain().focus().setImage({ src }).run();
    setImageUrl(""); 
  }, [editor]);

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file"; 
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl); 
      }
    };

    input.click(); 
  };

  const handleImageChange = () => {
    if (imageUrl && isValidImageUrl(imageUrl)) {
      onChange(imageUrl);
      setIsDialogOpen(false); 
    } else {
      // Handle invalid image URL (optional)
      alert("Invalid image URL");
    }
  };

  const isValidImageUrl = (url) => {
    const pattern = /\.(jpeg|jpg|gif|png)$/i;
    return pattern.test(url);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="Insert Image"
            className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden text-sm"
          >
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className="size-4 mr-2" />
            Paste Image URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleImageChange();
              }
            }}
          />
          <DialogFooter>
            <button onClick={handleImageChange}>Insert</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const AlignComponent = () => {
  const { editor } = useEditorStore();

  if (!editor) return null;



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-2 text-sm">
          <AlignJustifyIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run() }
            className={cn(
              "flex items-center gap-x-2 px-2 py-2 rounded-sm hover:bg-neutral-200/80",
              editor?.isActive?.({ textAlign: value }) && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


const ToolbarButton = ({ label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className="h-7 min-w-7 flex items-center justify-center rounded-sm px-2 text-sm hover:bg-neutral-200/80"
    title={label}
  >
    <Icon className="size-4" />
  </button>
);

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  if (!editor) return null;

  const onChange = (href) => {
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue(""); 
  };

  return (
    <DropdownMenu onOpenChange={(o)=>{
      if(o){
        setValue(editor?.getAttributes?.("link").href ||"")
      }
    }}>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden text-sm"
        >
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HightLightButton = () => {
  const { editor } = useEditorStore();
  if (!editor) return null; 
  const value = editor?.getAttributes?.("highlight")?.color || "#FFFF";

  const onChange = (color) => {
    editor?.chain().focus().setHighlight({color:color.hex}).run();
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden text-sm"
        >
          <HighlighterIcon className='size-4'/>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker  color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const TextColorButton = () => {
  const { editor } = useEditorStore();
  if (!editor) return null; 

  const value = editor?.getAttributes?.("textStyle")?.color || "#000000";

  const onChange = (color) => {
    editor?.chain().focus().setColor(color.hex).run();
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden text-sm"
        >
          <span className="text-sm">A</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  if (!editor) return null;

  const getCurrentHeading = () => {
    if (!editor || !editor.isActive) return "Normal text";

    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden text-sm"
        >
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {heading.map(({ label, value, fontSize }) => (
          <button
            key={value}
            onClick={() => {
              try {
                if (value === 0) {
                  editor.chain().focus().setParagraph().run();
                } else {
                  if (editor.isActive("heading", { level: value })) {
                    editor.chain().focus().setParagraph().run(); 
                  } else {
                    editor.chain().focus().toggleHeading({ level: value }).run(); 
                  }
                }
              } catch (error) {
                console.error("Error executing editor chain:", error);
              }
            }}
            style={{ fontSize }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-2 rounded-sm hover:bg-neutral-200/80",
              (value === 0 && !editor?.isActive?.("heading")) || editor?.isActive?.("heading", { level: value })
                ? "bg-neutral-200/80"
                : ""
            )}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  if (!editor) return null; 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-2 overflow-hidden text-sm"
        >
          <span className="truncate">
            {editor.getAttributes?.("textStyle")?.fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            className={cn(
              "flex items-center gap-x-2 px-2 py-2 rounded-sm hover:bg-neutral-200/80",
              editor.getAttributes?.("textStyle")?.fontFamily === value &&
                "bg-neutral-200/80"
            )}
            style={{ fontFamily: value }}
            onClick={() =>
              editor.chain().focus().setFontFamily(value).run()
            }
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Separator = () => <div className="text-gray-400 mb-2 text-3xl">|</div>;

const Toolbar = () => {
  const { editor } = useEditorStore();
  if (!editor) return null;

  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 w-full  rounded-[24px] min-h-[40px] flex items-center gap-[15px]">
      {sections.map((item) => (
        <ToolbarButton key={item.label} icon={item.icon} onClick={() => item.onClick(editor)} />
      ))}
      <Separator />
      <FontFamilyButton />
      <Separator />
      <FontSizeMenu/>
      <Separator />
      <HeadingLevelButton />
      <Separator />
      {section2.map((item) => (
        <ToolbarButton key={item.label} icon={item.icon} onClick={() => item.onClick(editor)} />
      ))}
      <TextColorButton />
      <HightLightButton />
      <Separator />
      <LinkButton />
      <ImageButton/>
      <AlignComponent/>
      <ListButton/>
      <LineHeightButton/>
      <Separator />
      {section3.map((item) => (
        <ToolbarButton key={item.label} icon={item.icon} onClick={() => item.onClick(editor)} />
      ))}
    </div>
  );
};
export default Toolbar;
