import { useDroppable } from '@dnd-kit/core';

export default function DroppableColumn({id, colour, children}) {
    const { isOver, setNodeRef } = useDroppable({ id });
    return(
        <div ref={setNodeRef} className='p-2 rounded-md mt-2 relative text-left'>
            <div className={`absolute inset-0 rounded-md transition-transform duration-200 transform
                bg-${colour}-400/20 ${isOver ? 'scale-111' : 'scale-100'}`} 
                style={{zIndex: 0}}
            />
            <div className='relative z-10 space-y-2 overflow-y-auto max-h-[53vh]'>
                {children}
            </div>
        </div>
    )
}