import { useDroppable } from '@dnd-kit/core';

export default function DroppableColumn({id, colour, children}) {
    const { isOver, setNodeRef } = useDroppable({ id });
    return(
        <div ref={setNodeRef} className={`p-2 rounded-md mt-2 transition-transform duration-150 bg-${colour}-400/20 text-left ${
        isOver ? "scale-105 border border-blue-400" : ""}`}>
            {children}
        </div>
    )
}