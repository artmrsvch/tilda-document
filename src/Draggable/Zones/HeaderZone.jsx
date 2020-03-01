import React from "react";

function HeaderZone({ catchClickForEdit, dropZoneState, saveComponentsData, componentsData }) {
    return (
        <header onClick={catchClickForEdit} data-zone="header" className="drag-zone__header">
            {dropZoneState.header.map(({ key, Component }, id) => (
                <Component
                    iterKey={key}
                    componentsData={componentsData}
                    saveComponentsData={saveComponentsData}
                    key={id}
                />
            ))}
        </header>
    );
}

export default HeaderZone;
