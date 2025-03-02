import React, { useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '../ui/carousel'
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'


const templates = [
    { id: "blank", label: "blank document", imageurl: "/docs-blank-googlecolors.png" },
    { id: "business-letter", label: "business letter", imageurl: "/business-letter.svg" },
    { id: "cover-letter", label: "cover letter", imageurl: "/cover-letter.svg" },
    { id: "letter", label: "letter", imageurl: "/letter.svg" },
    { id: "project-proposal", label: "project proposal", imageurl: "/project-proposal.svg" },
    { id: "software-proposal", label: "software proposal", imageurl: "/software-proposal.svg" },
    { id: "resume", label: "resume", imageurl: "/resume.svg" },
]

const TemplateGallery = () => {
    const create = useMutation(api.documents.create)
    const [isCreating, setIsCreating] = useState(false)
    const navigate = useNavigate()  

    const onTemplateClick = (title, initialContent) => {
        setIsCreating(true)

        create({ title, initialContent })
            .then((documentId) => {
                navigate(`/editor/${documentId}`)  
            })
            .finally(() => {
                setIsCreating(false)
            })
    }

    return (
        <div className='bg-[#F1F3F4]'>
            <div className='max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4'>
                <h3 className='text-base font-medium'>Start a new document</h3>
                <Carousel>
                    <CarouselNext />
                    <CarouselContent className="-ml-4">
                        {
                            templates.map((template) => (
                                <CarouselItem
                                    key={template.id}
                                    className="basis-1/2 sm:basis-1/3 md:basis1/4 lg:basis-1/5 xl:basis-1/5 2xl:basis-[14.285714%] pl-4"
                                >
                                    <div
                                        className={cn(
                                            "aspect-[3/4] flex flex-col gap-y-2",
                                            isCreating && "pointer-events-none opacity-50"
                                        )}
                                    >
                                        <button
                                            disabled={isCreating}
                                            onClick={() => { onTemplateClick(template.label, "") }}  
                                            style={{
                                                backgroundImage: `url(${template.imageurl})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat"
                                            }}
                                            className='w-full h-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white'
                                        />
                                        <p className='text-sm font-medium truncate'>{template.label}</p>
                                    </div>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                </Carousel>
            </div>
        </div>
    )
}

export default TemplateGallery
