import React from "react";

function HeaderZone({ dropZoneState, saveComponentsData, componentsData }) {
    return (
        <header data-zone="header" className="drag-zone__header">
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
