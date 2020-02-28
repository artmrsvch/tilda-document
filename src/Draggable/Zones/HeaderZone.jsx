import React, { useState } from "react";

function HeaderZone({ dropZoneState }) {
    return (
        <header data-zone="header" className="drag-zone__header">
            {dropZoneState.header.map(({ key, Component }, id) => (
                <Component iterKey={key} key={id} />
            ))}
        </header>
    );
}

export default HeaderZone;
