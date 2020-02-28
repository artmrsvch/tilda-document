import React, { useState } from "react";

function FooterZone({ dropZoneState }) {
    return (
        <footer data-zone="footer" className="drag-zone__footer">
            {dropZoneState.footer.map(({ key, Component }, id) => (
                <Component iterKey={key} key={id} />
            ))}
        </footer>
    );
}

export default FooterZone;
