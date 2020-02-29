import React, { useState } from "react";
import SideBar from "./Auxially/SideBar";
import { MainZone, HeaderZone, FooterZone } from "./Zones/index";

function ControlChanges({ dropZoneSetState, dropZoneState }) {
    //Принимаем из реакса распаршенный json с данными и делаем инициализацию в стейт
    //При помощи паттерна render-props реализуется весь рендер данных в компонентах
    const [stateMain, setStateMain] = useState();
    const [stateHeader, setStateHeader] = useState();
    const [stateFooter, setStateFooter] = useState();
    const [clickedCompo, setClickedCompo] = useState(); //сохранение кликнутого компонента
    const saveMainComponentsData = data => {
        setStateMain({ ...stateMain, [data.componentName]: data });
    };
    const saveHeaderComponentsData = data => {
        setStateHeader({ ...stateHeader, [data.componentName]: data });
    };
    const saveFooterComponentsData = data => {
        setStateFooter({ ...stateFooter, [data.componentName]: data });
    };
    const searchEditComponent = name => {
        // Поиск выбранного компонента
        let componentStateSettings;
        for (let componentInfo in stateMain) {
            if (stateMain[componentInfo].componentName === name) {
                componentStateSettings = stateMain[componentInfo];
                break;
            }
        }
        return componentStateSettings;
    };
    const catchClickForEdit = ({ target }) => {
        // Клик по кнопке edit
        if (target.dataset.btn === "btn-edit") {
            setClickedCompo(searchEditComponent(target.parentNode.dataset.name));
        }
    };
    return (
        <>
            <HeaderZone
                componentsData={stateHeader}
                saveComponentsData={saveHeaderComponentsData}
                dropZoneState={dropZoneState}
            />
            <MainZone
                catchClickForEdit={catchClickForEdit}
                saveComponentsData={saveMainComponentsData}
                componentsData={stateMain}
                dropZoneSetState={dropZoneSetState}
                dropZoneState={dropZoneState}
            />
            <FooterZone
                componentsData={stateFooter}
                saveComponentsData={saveFooterComponentsData}
                dropZoneState={dropZoneState}
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
