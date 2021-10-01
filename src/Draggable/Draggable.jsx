import React, { useState } from "react";
import DragZones from "./DragZones";
import { DragDropContext } from "react-beautiful-dnd";
import SideBar from "./components/SideBar";
import { controlButtons } from "./constans";

function Draggable() {
  const [state, setState] = useState({
    currentNode: null,
    icoSvg: controlButtons
  });
  const [isSave, setIsSave] = useState(null);

  return (
    <section className="drag">
      <div className="container">
        <SideBar
          setIsGlobalSaveStart={setIsSave}
          setStartDraggable={setState}
        />
        <DragDropContext>
          <DragZones
            isSave={isSave}
            setIsSave={setIsSave}
            currentNode={state.currentNode}
          />
        </DragDropContext>
      </div>
    </section>
  );
}

export default Draggable;
