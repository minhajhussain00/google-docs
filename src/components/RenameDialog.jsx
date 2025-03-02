import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from './ui/dialog'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Input } from './ui/input'
import { Button } from './ui/button'



const RemoveDialog = ({ documentId, children, initialTitle }) => {
    const rename = useMutation(api.documents.updateById);
    const [Title, setTitle] = useState(initialTitle)
    const [isOpen, setIsOpen] = useState(false)
    const [isUpdating, setisUpdating] = useState(false)
    const onSubmit = (e) => {
        e.preventDefault()
        setisUpdating(true)
        rename({ id: documentId, title: Title.trim() || "Untitled" })
            .finally(() => {
                setIsOpen(false)
                setisUpdating(false)
            })
    }
    return (
        <Dialog  open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent 
            onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            Rename
                        </DialogTitle>
                        <DialogDescription>
                            Enter a new name for this document.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='my-4'>
                        <Input value={Title} onChange={(e) => setTitle(e.target.value)} placeholder="Document name" onClick={(e) => e.stopPropagation()} />
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            disabled={isUpdating}
                            onClick={(e) => { e.stopPropagation(); setIsOpen(false) }}

                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isUpdating}
                            onClick={(e) => e.stopPropagation()}
                        >
                            Rename
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default RemoveDialog