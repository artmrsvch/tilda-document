import React, { useState } from "react";

function DragZones({ category, currentNode }) {
    const [state, setState] = useState({ header: [], footer: [], main: [] });
    const dragOver = e => e.preventDefault(); //без этого не работает дроп
    const dragEnter = ({ target }) => {
        target.style.border = "2px dashed black"; //подсвечиваем зону под курсором
    };
    const dragLeave = ({ target }) => {
        target.style.border = "none"; //снимаем подсветку бордера при выходе курсора из зоны
    };
    const dragDrop = ({ target }) => {
        target.style.border = "none"; //снимаем подсветку бордера
        const thatDropZone = zoneSearh(target); //получаем дропзону
        if (thatDropZone.dataset.zone === currentNode.category) {
            //разрешает дропать определенные категории только в соответ. зоны
            const appropriateComponent = getComponent(currentNode.category, currentNode.target); //получаем нужный компонент для рендера
            if (state[thatDropZone.dataset.zone].length) {
                //если в зоне уже есть компонент
                if (thatDropZone.dataset.zone === "main") {
                    //разрешаем добавлять несколько компонентов только в main
                    const stateObjComponent = state[thatDropZone.dataset.zone];
                    const newBundleComponent = [stateObjComponent.length + 1, appropriateComponent];
                    stateObjComponent.push(newBundleComponent);
                    setState({
                        ...state,
                        [thatDropZone.dataset.zone]: stateObjComponent
                    });
                } else {
                    //если зона не main, то перезаписываем
                    setState({
                        ...state,
                        [thatDropZone.dataset.zone]: [[1, appropriateComponent]]
                    });
                }
            } else {
                //если зона пуста, то записываем туда компонент
                setState({
                    ...state,
                    [thatDropZone.dataset.zone]: [[1, appropriateComponent]]
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
        if (e.target.dataset.btn) {
            console.log("КЛИК ПО КНОПКЕ ТАРГЕТ", e.target);
            console.log("КЛИК ПО КНОПКЕ СТЕЙТ", state);
            //обрабатываем клики только по кнопке
            const thatComponent = e.target.parentNode; //получаем компонент
            console.log("КОМПОНЕНТ", thatComponent);
            const thatDataAttrZone = thatComponent.parentNode.dataset.zone; //получаем дропзону
            state[thatDataAttrZone].forEach(([key], index) => {
                console.log("ЦИКЛ КОМПОНЕНТ", key);
                console.log("КЕЙ КОМПОНЕНТ", thatComponent.dataset.key);
                if (String(key) === thatComponent.dataset.key) {
                    console.log("СОВПАЛО СТЕЙТ", state);
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
    };
    return (
        <div
            onDragLeave={dragLeave}
            onDragEnter={dragEnter}
            onDragOver={dragOver}
            onDrop={dragDrop}
            onClick={checkClick}
            className="drag-zone"
        >
            <header data-zone="header" className="drag-zone__header">
                {state.header &&
                    state.header.map(([key, Component], id) => (
                        <Component iterKey={key} key={id} />
                    ))}
            </header>
            <main data-zone="main" className="drag-zone__main">
                {state.main &&
                    state.main.map(([key, Component], id) => <Component iterKey={key} key={id} />)}
            </main>
            <footer data-zone="footer" className="drag-zone__footer">
                {state.footer &&
                    state.footer.map(([key, Component], id) => (
                        <Component iterKey={key} key={id} />
                    ))}
            </footer>
        </div>
    );
}
export default DragZones;
