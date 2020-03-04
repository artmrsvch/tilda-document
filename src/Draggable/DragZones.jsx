import React, { useState } from "react";
import ControlChanges from "./ControlChanges";
import { initialDragZones, createArrForJson } from "./dataProcessing";

function DragZones({ category, currentNode }) {
    const { count, main, initialProps } = initialDragZones();
    const [state, setState] = useState({ count, main });
    const dragOver = e => e.preventDefault();
    const dragDrop = ({ target }) => {
        const appropriateComponent = getComponent(currentNode.category, currentNode.target);
        const stateObjComponent = state.main;
        const newBundleComponent = {
            key: state.count + 1,
            Component: appropriateComponent,
            name: currentNode.target
        };
        stateObjComponent.push(newBundleComponent);
        setState({
            ...state,
            count: state.count + 1,
            main: stateObjComponent
        });
    };

    const saveGlobalSettings = objectProps => {
        const globalBandle = {
            ...objectProps,
            dropComponentData: {
                ...state,
                main: createArrForJson(state.main)
            }
        };
        localStorage.usedComponents = JSON.stringify(globalBandle);
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
                    if (objComponet.subName === subCategotyName) {
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
            const thatComponent = e.target.parentNode;
            state.main.forEach(({ key }, index) => {
                if (String(key) === thatComponent.dataset.key) {
                    const stateArr = state.main;
                    stateArr.splice(index, 1);
                    setState({
                        ...state,
                        main: stateArr
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
                initialProps={initialProps}
                dropZoneSetState={setState}
                dropZoneState={state}
                saveGlobalSettings={saveGlobalSettings}
            />
        </div>
    );
}
export default DragZones;
