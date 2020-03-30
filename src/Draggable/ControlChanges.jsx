import React, { useState } from "react";
import SideBar from "./Auxially/SideBar";
import { MainZone } from "./Zones/index";

function ControlChanges({
    dropZoneSetState,
    dropZoneState,
    saveGlobalSettings,
    initialProps,
    isSave,
    dragOver,
    dragEnter,
    dragLeave,
    dragDrop
}) {
    //Принимаем из редакса распаршенный json с данными и делаем инициализацию в стейт
    //При помощи паттерна render-props реализуется весь рендер данных в компонентах
    const [stateMain, setStateMain] = useState(initialProps.main);
    const [clickedCompo, setClickedCompo] = useState(); //сохранение кликнутого компонента
    const saveMainComponentsData = data => {
        setStateMain({ ...stateMain, [data.componentName]: data });
    };
    const searchEditComponent = (name, thatState) => {
        // Поиск выбранного компонента
        let componentStateSettings;
        for (let componentInfo in thatState) {
            if (thatState[componentInfo].componentName === name) {
                componentStateSettings = thatState[componentInfo];
                break;
            }
        }
        return componentStateSettings;
    };
    const saveComponentsProps = () => {
        //сохранение всех изменений в компонентах
        const bandle = {
            propsComponent: {
                main: stateMain
            }
        };
        saveGlobalSettings(bandle);
    };
    isSave && saveComponentsProps();
    const catchClickForEdit = ({ target }) => {
        if (target.dataset.btn === "btn-edit") {
            const forAsideBandle = {
                ...searchEditComponent(target.parentNode.dataset.name, stateMain),
                ...{ desState: stateMain, desSetState: setStateMain }
            };
            setClickedCompo(forAsideBandle);
        }
    };
    return (
        <>
            <MainZone
                catchClickForEdit={catchClickForEdit}
                saveComponentsData={saveMainComponentsData}
                componentsData={stateMain}
                dropZoneSetState={dropZoneSetState}
                dropZoneState={dropZoneState}
                dragOver={dragOver}
                dragEnter={dragEnter}
                dragLeave={dragLeave}
                dragDrop={dragDrop}
            />
            <SideBar
                closeData={setClickedCompo}
                data={clickedCompo}
                storage={stateMain}
                setValues={setStateMain}
            />
        </>
    );
}

export default ControlChanges;
