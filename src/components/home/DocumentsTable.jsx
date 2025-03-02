import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Loader2Icon } from 'lucide-react'
import DocumentRow from './DocumentRow'
import { Button } from '../ui/button'

const DocumentsTable = ({documents,status,loadMore}) => {
  return (
    <div className='max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5'>
        {documents === undefined ? (
            <div className='flex justify-center items-center h-26'>
            <Loader2Icon className='animate-spin size-6 text-muted '/>
            </div>
        ) : (
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-none">
                        <TableHead>
                            Name
                        </TableHead>
                        <TableHead>
                              &nbsp;
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                              Shared
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                              Created at
                        </TableHead>
                    </TableRow>
                </TableHeader>
                {documents.length === 0 ? (
                    <TableBody>
                        <TableRow className="hover:bg-transparent border-none">
                            <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                No Documents found
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ):(
                    <TableBody>
                        {
                            documents.map((document)=>(
                                <DocumentRow key={document._id} document = {document}/>
                            ))
                        }
                    </TableBody>
                )}
            </Table>
        )}
        <div className='flex items-center justify-center'>
            <Button variant="ghost" size="sm" onClick={()=>loadMore(5)} disabled={status !== "CanLoadMore"}>
                {status == "CanLoadMore" ? "Load more" : "End of result"}

            </Button>
        </div>
    </div>
  )
}

export default DocumentsTable