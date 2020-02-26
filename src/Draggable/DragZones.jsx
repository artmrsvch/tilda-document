import React, { useState } from "react";

function DragZones({ category, currentNode }) {
    const [state, setState] = useState({ header: null, footer: null, main: null });
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
            if (state[thatDropZone.dataset.zone]) {
                //если в зоне уже есть компонент
                if (thatDropZone.dataset.zone === "main") {
                    //разрешаем добавлять несколько компонентов только в main
                    const stateArr = state[thatDropZone.dataset.zone];
                    stateArr.push(appropriateComponent);
                    setState({
                        ...state,
                        [thatDropZone.dataset.zone]: stateArr
                    });
                } else {
                    //если зона не main, то перезаписываем
                    setState({ ...state, [thatDropZone.dataset.zone]: [appropriateComponent] });
                }
            } else {
                //если зона пуста, то записываем туда компонент
                setState({ ...state, [thatDropZone.dataset.zone]: [appropriateComponent] });
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
        e.stopPropagation(); // отменяем всплытие событий выше
        if (e.target.dataset.btn) {
            //обрабатываем клики только по кнопке
            const thatComponent = e.target.parentNode; //получаем компонент
            const thatDataAttrZone = thatComponent.parentNode.dataset.zone; //получаем дропзону
            state[thatDataAttrZone].forEach((iterComponent, index) => {
                if (iterComponent.name === thatComponent.dataset.name) {
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
                {state.header && state.header.map((Component, id) => <Component key={id} />)}
            </header>
            <main data-zone="main" className="drag-zone__main">
                {state.main && state.main.map((Component, id) => <Component key={id} />)}
            </main>
            <footer data-zone="footer" className="drag-zone__footer">
                {state.footer && state.footer.map((Component, id) => <Component key={id} />)}
            </footer>
        </div>
    );
}
export default DragZones;
