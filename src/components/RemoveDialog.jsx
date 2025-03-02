import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'


const RemoveDialog = ({documentId,children}) => {
    const remove = useMutation(api.documents.removeById);
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent onClick={(e)=>e.stopPropagation()}>
        <AlertDialogHeader>
            <AlertDialogTitle>
                Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
                This action can't be undone. This will permanently delete your document.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel onClick={(e)=>e.stopPropagation()}>
                Cancel
            </AlertDialogCancel>
            <AlertDialogAction
             onClick={(e)=>{
                e.preventDefault()
                remove({id: documentId})
                
            }}
            >
                Delete
            </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default RemoveDialog