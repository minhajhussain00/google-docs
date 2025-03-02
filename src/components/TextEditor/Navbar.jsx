import { Link } from 'react-router-dom'
import React from 'react'
import DocumentInput from './Document-input'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger
} from "../ui/menubar"
import {
    BoldIcon, FileIcon,
    FileJsonIcon,
    FilePenIcon,
    FilePlus2Icon,
    FileTextIcon,
    GlobeIcon,
    ItalicIcon,
    PrinterIcon,
    Redo2Icon,
    RemoveFormattingIcon,
    StrikethroughIcon,
    TextIcon,
    Trash2Icon,
    UnderlineIcon,
    Undo2Icon
} from 'lucide-react'
import { BsFilePdf } from 'react-icons/bs'
import { useEditorStore } from '@/store/use-editor-store'
import { OrganizationSwitcher, UserButton } from '@clerk/clerk-react'

const Navbar = () => {
    const { editor } = useEditorStore()
    if (!editor) return null
    const insertTable = ({ rows, cols }) => {
        editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run()
    }
    const onDownload = (blob, filename) => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        a.click()
    }
    const saveJSON = () => {
        if (!editor) return
        const content = editor?.getJSON();
        const blob = new Blob([JSON.stringify(content)], {
            type: "application/json",
        })
        onDownload(blob, `File.JSON`)
    }
    const saveHTML = () => {
        if (!editor) return
        const content = editor?.getHTML();
        const blob = new Blob([content], {
            type: "text/HTML",
        })
        onDownload(blob, `File.HTML`)
    }
    const saveText = () => {
        if (!editor) return
        const content = editor?.getText();
        const blob = new Blob([content], {
            type: "text/plain",
        })
        onDownload(blob, `File.txt`)
    }

    return (
        <nav className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <Link href="/">
                    <img src="/logo.svg" alt="" width={36} height={36} />
                </Link>
                <div
                    className='flex flex-col'
                >
                    <DocumentInput />
                    <div className='flex'>
                        <Menubar className="border-none bg-transparent shadow-none h-[20px] p-0">
                            <MenubarMenu >
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    File
                                </MenubarTrigger>
                                <MenubarContent className="print:hidden">
                                    <MenubarSub >
                                        <MenubarSubTrigger>
                                            <FileIcon className='size-6 mr-2' />
                                            save
                                        </MenubarSubTrigger>

                                        <MenubarSubContent >
                                            <MenubarItem onClick={saveJSON}>
                                                <FileJsonIcon className='size-6 mr-2' />
                                                JSON
                                            </MenubarItem>
                                            <MenubarItem onClick={saveHTML}>
                                                <GlobeIcon className='size-6 mr-2' />
                                                HTML
                                            </MenubarItem >
                                            <MenubarItem onClick={() => window.print()}>
                                                <BsFilePdf className='size-6 mr-2' />
                                                PDF
                                            </MenubarItem>
                                            <MenubarItem onClick={saveText}>
                                                <FileTextIcon className='size-6 mr-2' />
                                                Text
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem>
                                        <FilePlus2Icon className='size-6 mr-2' />
                                        New Document
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>
                                        <FilePenIcon className='size-6 mr-2' />
                                        Rename
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Trash2Icon className='size-6 mr-2' />
                                        Remove
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem onClick={() => window.print()} >
                                        <PrinterIcon className='size-6 mr-2' />
                                        Print<MenubarShortcut className="text-lg">⌘P</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Edit
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                                        <Undo2Icon className='size-6 mr-2' />
                                        Undo<MenubarShortcut className="text-lg">⌘Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                                        <Redo2Icon className='size-6 mr-2' />
                                        Redo<MenubarShortcut className="text-lg">⌘Y</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu >
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Insert
                                </MenubarTrigger>
                                <MenubarContent className="print:hidden">
                                    <MenubarSub >
                                        <MenubarSubTrigger>
                                            <FileIcon className='size-6 mr-2' />
                                            Table
                                        </MenubarSubTrigger>

                                        <MenubarSubContent >
                                            <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>
                                                1 x 1
                                            </MenubarItem>

                                            <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>
                                                2 x 2
                                            </MenubarItem >

                                            <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>
                                                3 x 3
                                            </MenubarItem>

                                            <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>
                                                4 x 4
                                            </MenubarItem>

                                        </MenubarSubContent>
                                    </MenubarSub>

                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>
                                    Format
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <TextIcon className='size-6 mr-2' />
                                            Text
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                                                <BoldIcon className='size-6 mr-2' />
                                                Bold<MenubarShortcut className="text-lg">⌘B</MenubarShortcut>
                                            </MenubarItem>

                                            <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                                                <UnderlineIcon className='size-6 mr-2' />
                                                Underline<MenubarShortcut className="text-lg">⌘</MenubarShortcut>
                                            </MenubarItem>

                                            <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                                                <ItalicIcon className='size-6 mr-2' />
                                                Italic<MenubarShortcut className="text-lg">⌘I</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                                                <StrikethroughIcon className='size-6 mr-2' />
                                                <span> Strikethrough &nbsp;&nbsp;&nbsp;</span>
                                                <MenubarShortcut className="text-lg">⌘S</MenubarShortcut>
                                            </MenubarItem>

                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                                        <RemoveFormattingIcon className='size-6 mr-2' />
                                        Clear Formatting
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            
                        </Menubar>
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-6 pl-6'>

                                <OrganizationSwitcher
                                    afterSelectPersonalUrl="/"
                                    afterLeaveOrganizationUrl='/'
                                    afterSelectOrganizationUrl="/"
                                    afterCreateOrganizationUrl="/"
                                />
                                <UserButton />

                            </div>
        </nav>
    )
}

export default Navbar