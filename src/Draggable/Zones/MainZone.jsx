import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function MainZone({
    dropZoneSetState,
    dropZoneState,
    saveComponentsData,
    componentsData,
    catchClickForEdit,
    dragOver,
    dragEnter,
    dragLeave,
    dragDrop
}) {
    const reorder = (list, startIndex, endIndex) => {
        //сортировка массива после дропа элемента
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const onDragEnd = result => {
        if (!result.destination) {
            //eсли дроп был мимо не в дропзоне main
            return;
        }
        //переорганизовываем массив
        const items = reorder(dropZoneState.main, result.source.index, result.destination.index);
        dropZoneSetState({ ...dropZoneState, main: items });
    };
    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        //background: isDragging ? "lightgreen" : "grey", //смена бэкраунда компонента который переносится
        ...draggableStyle //пропсы реализации всей анимации драга
    });
    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey"
    });

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(
                    provided, //provider - реализации dnd,
                    snapshot // snapshot-переменные состояний dnd
                ) => (
                    <main
                        onClick={catchClickForEdit}
                        onDragOver={dragOver}
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDrop={dragDrop}
                        {...provided.droppableProps} // пропсы для анимирования переноса
                        ref={provided.innerRef} //ссылка на дом узел(референс)
                        className="drag-zone__main"
                        data-zone="main"
                        // style={getListStyle(snapshot.isDraggingOver)} //смена бэкграунда приактивном dnd
                    >
                        {dropZoneState.main.map(({ key, Component }, index) => (
                            <Draggable key={`${key}`} draggableId={`${key}`} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        {
                                            <Component
                                                componentsData={componentsData}
                                                saveComponentsData={saveComponentsData}
                                                iterKey={key}
                                            />
                                        }
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </main>
                )}
            </Droppable>
        </DragDropContext>
    );
}
export default MainZone;
