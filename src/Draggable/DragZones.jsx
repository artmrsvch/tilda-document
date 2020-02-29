import React, { useState } from "react";
import ControlChanges from "./ControlChanges";

function DragZones({ category, currentNode }) {
    const [state, setState] = useState({ count: 1, header: [], footer: [], main: [] });
    const dragOver = e => e.preventDefault(); //без этого не работает дроп
    const dragDrop = ({ target }) => {
        console.log(state);
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
                        key: state.count + 1,
                        Component: appropriateComponent,
                        name: currentNode.target
                    };
                    stateObjComponent.push(newBundleComponent);
                    setState({
                        ...state,
                        count: state.count + 1,
                        [thatDropZone.dataset.zone]: stateObjComponent
                    });
                } else {
                    //если  зона не main, то перезаписываем
                    setState({
                        ...state,
                        [thatDropZone.dataset.zone]: [
                            {
                                key: state.count,
                                Component: appropriateComponent,
                                name: currentNode.target
                            }
                        ]
                    });
                }
            } else {
                //если зона пуста, то записываем туда компонент
                setState({
                    ...state,
                    [thatDropZone.dataset.zone]: [
                        {
                            key: state.count,
                            Component: appropriateComponent,
                            name: currentNode.target
                        }
                    ]
                });
            }
        }
    };
    const createArrForJson = arr => {
        let tempArr = [];
        arr.forEach(({ name, key }) => {
            tempArr.push({ name, key });
        });
        return tempArr;
    };
    const saveGlobalSettings = objectProps => {
        const globalBandle = {
            ...objectProps,
            dropComponentData: {
                ...state,
                header: createArrForJson(state.header),
                main: createArrForJson(state.main),
                footer: createArrForJson(state.footer)
            }
        };
        console.log(globalBandle);
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
    };

    return (
        <div
            data-global="global"
            onDragOver={dragOver}
            onDrop={dragDrop}
            onClick={checkClick}
            className="drag-zone"
        >
            <ControlChanges
                zoneSearh={zoneSearh}
                dropZoneSetState={setState}
                dropZoneState={state}
                saveGlobalSettings={saveGlobalSettings}
            />
        </div>
    );
}
export default DragZones;
