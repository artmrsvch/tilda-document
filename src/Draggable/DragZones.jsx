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
        if (thatDropZone.getAttribute("zone") === currentNode.category) {
            //разрешает дропать определенные категории только в соответ. зоны
            const appropriateComponent = getComponent(currentNode.category, currentNode.target); //получаем нужный компонент для рендера
            setState({ ...state, [thatDropZone.getAttribute("zone")]: [appropriateComponent] }); //вписываем компонент в стейт
        }
    };
    const zoneSearh = target => {
        //рекурсивный обход DOM, поиск дроп зоны, возвращает зону
        //если DOMузел имеет атрибут zone, то возвращаем его, иначе идем на уровень выше
        return target.getAttribute("zone") ? target : zoneSearh(target.parentNode);
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

    return (
        <div className="drag-zone">
            <header
                zone="header"
                onDragLeave={dragLeave}
                onDragEnter={dragEnter}
                onDragOver={dragOver}
                onDrop={dragDrop}
                className="drag-zone__header"
            >
                {state.header && state.header.map((Component, id) => <Component key={id} />)}
            </header>
            <main
                zone="main"
                onDragLeave={dragLeave}
                onDragEnter={dragEnter}
                onDragOver={dragOver}
                onDrop={dragDrop}
                className="drag-zone__main"
            >
                {state.main && state.main.map((Component, id) => <Component key={id} />)}
            </main>
            <footer
                zone="footer"
                onDragLeave={dragLeave}
                onDragEnter={dragEnter}
                onDragOver={dragOver}
                onDrop={dragDrop}
                className="drag-zone__footer"
            >
                {state.footer && state.footer.map((Component, id) => <Component key={id} />)}
            </footer>
        </div>
    );
}
export default DragZones;
