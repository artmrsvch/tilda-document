import React, { useState } from "react";
import SideBar from "./Auxially/SideBar";
import { MainZone, HeaderZone, FooterZone } from "./Zones/index";

function ControlChanges({
    dropZoneSetState,
    dropZoneState,
    saveGlobalSettings,
    zoneSearh,
    initialProps
}) {
    //Принимаем из редакса распаршенный json с данными и делаем инициализацию в стейт
    //При помощи паттерна render-props реализуется весь рендер данных в компонентах
    const [stateMain, setStateMain] = useState(initialProps.main);
    const [stateHeader, setStateHeader] = useState(initialProps.header);
    const [stateFooter, setStateFooter] = useState(initialProps.footer);
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
                header: stateHeader,
                main: stateMain,
                footer: stateFooter
            }
        };
        saveGlobalSettings(bandle);
    };
    const catchClickForEdit = ({ target }) => {
        // Клик по кнопке edit
        if (target.dataset.btn === "btn-edit") {
            const zone = zoneSearh(target.parentNode).dataset.zone;
            const desiredState =
                zone === "header"
                    ? { desState: stateHeader, desSetState: setStateHeader }
                    : zone === "main"
                    ? { desState: stateMain, desSetState: setStateMain }
                    : zone === "footer"
                    ? { desState: stateFooter, desSetState: setStateFooter }
                    : null;
            const forAsideBandle = {
                ...searchEditComponent(target.parentNode.dataset.name, desiredState.desState),
                ...desiredState
            };
            setClickedCompo(forAsideBandle);
        }
        //Клик по сохранению
        if (target.dataset.btn === "btn-save") {
            saveComponentsProps();
        }
    };
    return (
        <>
            <HeaderZone
                catchClickForEdit={catchClickForEdit}
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
                catchClickForEdit={catchClickForEdit}
                componentsData={stateFooter}
                saveComponentsData={saveFooterComponentsData}
                dropZoneState={dropZoneState}
            />
            <button onClick={catchClickForEdit} data-btn="btn-save" className="button7">
                Сохранить
            </button>
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
