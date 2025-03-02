import React from 'react'
import { TableCell,TableRow } from '../ui/table'
import {SiGoogledocs} from "react-icons/si"
import { Building2Icon, CircleUserIcon, MoreVerticalIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import {format} from "date-fns"
import DocumentMenu from './DocumentMenu'
const DocumentRow = ({document}) => {
    const onNewTabClick = (id)=>{
        window.open(`/editor/${id}`,"_blank")
    }
    const navigate = useNavigate()  
    
  return (
    <TableRow className="cursor-pointer" onClick={(e)=>navigate(`/editor/${document._id}`) }>
        <TableCell className="w-[50px]">
        <SiGoogledocs className='size-7 fill-blue-500'/>
        </TableCell>
        <TableCell className="font-medium md:w-[45%]">
            {document.title}
        </TableCell>
        <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
            {document.organizationId ? <Building2Icon className='size-6'/> : <CircleUserIcon className='size-6 '/>}
            {document.organizationId ? "Organization ":"Personal"}
        </TableCell>
        <TableCell className="text-muted-foreground hidden md:table-cell ">
            {format(new Date (document._creationTime),"MMM dd, yyyy")}
        </TableCell>
        <DocumentMenu
        documentId={document._id}
        title={document.title}
        onNewTab={onNewTabClick}
        />
    </TableRow>
  )
}

export default DocumentRow