import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function DragZones({ category, currentNode }) {
    const [state, setState] = useState({ header: [], footer: [], main: [] });
    const dragOver = e => e.preventDefault(); //без этого не работает дроп
    const dragDrop = ({ target }) => {
        const thatDropZone = zoneSearh(target); //получаем дропзону
        if (thatDropZone.dataset.zone === currentNode.category) {
            //разрешает дропать определенные категории только в соответ. зоны
            const appropriateComponent = getComponent(currentNode.category, currentNode.target); //получаем нужный компонент для рендера
            if (state[thatDropZone.dataset.zone].length) {
                //если в зоне уже есть компонент
                if (thatDropZone.dataset.zone === "main") {
                    //разрешаем добавлять несколько компонентов только в main
                    const stateObjComponent = state[thatDropZone.dataset.zone];
                    const newBundleComponent = {
                        key: stateObjComponent.length + 1,
                        Component: appropriateComponent
                    };
                    stateObjComponent.push(newBundleComponent);
                    setState({
                        ...state,
                        [thatDropZone.dataset.zone]: stateObjComponent
                    });
                } else {
                    //если  зона не main, то перезаписываем
                    setState({
                        ...state,
                        [thatDropZone.dataset.zone]: [{ key: 1, Component: appropriateComponent }]
                    });
                }
            } else {
                //если зона пуста, то записываем туда компонент
                setState({
                    ...state,
                    [thatDropZone.dataset.zone]: [{ key: 1, Component: appropriateComponent }]
                });
            }
        }
    };
    const zoneSearh = target => {
        //рекурсивный обход DOM, поиск дроп зоны, возвращает зону
        //если DOMузел имеет атрибут zone, то возвращаем его, иначе идем на уровень выше
        return target.dataset.zone ? target : zoneSearh(target.parentNode);
    };
    const getComponent = (categoryName, subCategotyName) => {
        //поиск компонента по названию подкатегории, принимаем название категории и навзвание подкатегории
        let temp; //временный стейт функции
        category.forEach(objectCategory => {
            //цикл по массиву с настройками, достаем на каждом цикле объект
            if (objectCategory.name.toLowerCase() === categoryName) {
                //имя категории в настройках приводим к ловеркейс и проверяем совпадение
                objectCategory.presents.forEach(objComponet => {
                    //если совпало, то запускаем цикл по списку подкатегорий с компонентами
                    if (objComponet.subName.toLowerCase() === subCategotyName) {
                        //совпадение по названию подкатегории
                        temp = objComponet.component; //достаем соответсвующий компонент и записываем в переменную
                    }
                });
            }
        });
        return temp;
    };
    const checkClick = e => {
        if (e.target.dataset.btn === "btn-close") {
            //обрабатываем клики только по кнопке
            const thatComponent = e.target.parentNode; //получаем компонент
            const thatDataAttrZone = thatComponent.parentNode.parentNode.dataset.zone; //получаем дропзону
            state[thatDataAttrZone].forEach(({ key }, index) => {
                if (String(key) === thatComponent.dataset.key) {
                    //нашли компонент в массиве отображенных
                    const stateArr = state[thatDataAttrZone]; //склонировали стейт
                    stateArr.splice(index, 1); //удалили из массива
                    setState({
                        //зафиксировали изменения
                        ...state,
                        [thatDataAttrZone]: stateArr
                    });
                }
            });
        }
        if (e.target.dataset.btn === "btn-move") {
        }
    };
    const reorder = (list, startIndex, endIndex) => {
        //сортировка массива после дропа элемента
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        margin: `0 0 ${8}px 0`,
        height: "100%",
        background: isDragging ? "lightgreen" : "grey", //смена бэкраунда компонента который переносится
        ...draggableStyle //пропсы реализации всей анимации драга
    });

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey"
    });
    const onDragEnd = result => {
        if (!result.destination) {
            //eсли дроп был мимо не в дропзоне main
            return;
        }
        //переорганизовываем массив
        const items = reorder(state.main, result.source.index, result.destination.index);

        setState({ ...state, main: items });
    };
    return (
        <div
            data-global="global"
            onDragOver={dragOver}
            onDrop={dragDrop}
            onClick={checkClick}
            className="drag-zone"
        >
            <header data-zone="header" className="drag-zone__header">
                {state.header &&
                    state.header.map(({ key, Component }, id) => (
                        <Component iterKey={key} key={id} />
                    ))}
            </header>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(
                        provided, //provider - реализации dnd,
                        snapshot // snapshot-переменные состояний dnd
                    ) => (
                        <main
                            {...provided.droppableProps} // пропсы для анимирования переноса
                            ref={provided.innerRef} //ссылка на дом узел(референс)
                            className="drag-zone__main"
                            data-zone="main"
                            //style={getListStyle(snapshot.isDraggingOver)} //смена бэкграунда приактивном dnd
                        >
                            {state.main.map(({ key, Component }, index) => (
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
                                            {<Component iterKey={key} />}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </main>
                    )}
                </Droppable>
            </DragDropContext>
            <footer data-zone="footer" className="drag-zone__footer">
                {state.footer &&
                    state.footer.map(({ key, Component }, id) => (
                        <Component iterKey={key} key={id} />
                    ))}
            </footer>
        </div>
    );
}
export default DragZones;
