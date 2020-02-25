import React from "react";

function DragZones({ dragLeave, dragEnter, dragOver, dragDrop }) {
    return (
        <div className="drag-zone">
            <header
                zone="Header"
                onDragLeave={dragLeave}
                onDragEnter={dragEnter}
                onDragOver={dragOver}
                onDrop={dragDrop}
                className="drag-zone__header"
            ></header>
            <main
                zone="Main"
                onDragLeave={dragLeave}
                onDragEnter={dragEnter}
                onDragOver={dragOver}
                onDrop={dragDrop}
                className="drag-zone__main"
            ></main>
            <footer
                zone="Footer"
                onDragLeave={dragLeave}
                onDragEnter={dragEnter}
                onDragOver={dragOver}
                onDrop={dragDrop}
                className="drag-zone__footer"
            ></footer>
        </div>
    );
}
export default DragZones;
