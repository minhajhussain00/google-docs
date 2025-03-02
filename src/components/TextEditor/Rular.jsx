import { FaCaretDown } from 'react-icons/fa'
import React, { useRef,useState } from 'react'

const markers = Array.from({length:83},(_,i)=>i)

const Rular = () => {
  const [LeftMargin, setLeftMargin] = useState(56)
  const [RightMargin, setRightMargin] = useState(56)
  const [isDraggingLeft, setIsDraggingLeft] = useState(false)
  const [isDraggingRight, setIsDraggingRight] = useState(false)
  const rularRef  = useRef(null)
  const handleLeftMouseDown  = ()=>{
    setIsDraggingLeft(true)
  }
  const handleRightMouseDown  = ()=>{
    setIsDraggingRight(true)
  }
  const handleMouseMove =(e) =>{
    if((isDraggingRight || isDraggingLeft )&& rularRef.current){
      const container = rularRef.current.querySelector("#rular-container")
      if (container) {
        const containerRect = container.getBoundingClientRect()
        const relativeX = e.clientX - containerRect.left
        const rawPosition = Math.max(0,Math.min(816,relativeX))
        if(isDraggingLeft){
          const maxLeftPosition = 816-RightMargin-100
          const newLeftposition = Math.min(rawPosition,maxLeftPosition)
          setLeftMargin(newLeftposition)
        }else if(isDraggingRight){
          const maxRightPosition = 816-(LeftMargin+100)
          const newRightposition = Math.max(816-rawPosition,0)
          const constrainedRightPosition = Math.min(newRightposition,maxRightPosition)
          setRightMargin(constrainedRightPosition)
        }
      }
    }
  }
  const handleMouseUp=()=>{
    setIsDraggingLeft(false)
    setIsDraggingRight(false)
  }
 const handleLeftDoubleClick = ()=>{
    setLeftMargin(56)
 }
 const handleRightDoubleClick = ()=>{
    setRightMargin(56)
 }

  return (
    <div
      ref={rularRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
     className='w-[816px] mx-auto  h-5 border-b my-2 border-gray-300 flex items-end relative  select-none print:hidden'>
        <div id='rular-container'
        className='w-full h-full relative'
        >
           <Marker
           position={LeftMargin}
           isLeft={true}
           isDragging={isDraggingLeft}
           onMouseDown={handleLeftMouseDown}
           onDoubleClick={handleLeftDoubleClick}
           />
           <Marker
           position={RightMargin}
           isLeft={false}
           isDragging={isDraggingRight}
           onMouseDown={handleRightMouseDown}
           onDoubleClick={handleRightDoubleClick}
           />
          <div className='absolute inset-x-0 bottom-0 h-full'>
            <div className='relative h-full w-[816px]'>
              {
                markers.map((marker)=>{
                    const position = (marker*816)/82
                    return(
                        <div
                          key={marker}
                          className='absolute bottom-0 '
                          style={{left:`${position}px`}}
                        >
                            {
                                marker % 10 == 0 &&(
                                    <>
                                    <div className='absolute  bottom-0  w-[1px] h-2 bg-neutral-500'/>
                                    <span 
                                    className='absolute bottom-2 text-[10px] text-neutral-500 transfrom -translate-x-1/2 '
                                    >{marker/10 +1}</span>
                                    </>
                                )
                            }
                            {
                                marker % 5 == 0 && marker % 10 !== 0 && (
                                    <div className='absolute bottom-0 w-[1px] h-1.5 bg-slate-600' />
                                )
                            }
                            {marker % 5 !== 0 && (
                                <div className='absolute bottom-0 w-[1px] h-1 bg-slate-700' />
                            )}
                        </div>
                    )
                })
              }
            </div>
          </div>
        </div>
    </div>
  )
}

const Marker = ({position,isLeft,isDragging, onMouseDown,onDoubleClick})=>{
  return(
  
  <div className='absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2 '
  style={{[isLeft ? "left" : "right"]:`${position}px`}}
   onMouseDown={onMouseDown}
   onDoubleClick={onDoubleClick}
   >
    <FaCaretDown className="absolute size-7  -top-2 left-1/2 transform -translate-x-1/2 fill-blue-600"/>
    <div 
      className='absolute left-1/2 top-4 transform -translate-x-1/2 '
      style={{height:"100vh", width:"1px",transform:"scaleX(0.5)",background:"#3b72f6",display:isDragging?"block":"none"}}
    />
  </div>
)
}


export default Rular