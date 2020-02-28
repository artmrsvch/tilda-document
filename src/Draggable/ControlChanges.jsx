import React, { useState } from "react";
import SideBar from "./Auxially/SideBar";
import { MainZone, HeaderZone, FooterZone } from "./Zones/index";

function ControlChanges({ dropZoneSetState, dropZoneState }) {
    //Принимаем из реакса распаршенный json с данными и делаем инициализацию в стейт
    //При помощи паттерна render-props реализуется весь рендер данных в компонентах
    const [stateMain, setStateMain] = useState();
    const [stateHeader, setStateHeader] = useState();
    const [stateFooter, setStateFooter] = useState();

    const saveMainComponentsData = data => {
        setStateMain({ ...stateMain, [data.componentName]: data });
    };
    const saveHeaderComponentsData = data => {
        setStateHeader({ ...stateHeader, [data.componentName]: data });
    };
    const saveFooterComponentsData = data => {
        setStateFooter({ ...stateFooter, [data.componentName]: data });
    };
    const catchClickForEdit = ({ target }) => {
        if (target.dataset.btn === "btn-edit") {
            console.log("EDIT");
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
            <SideBar dataComponent />
        </>
    );
}

export default ControlChanges;
