import React, { useState } from "react";
import ControlChanges from "./ControlChanges";
import { initialDragZones, createArrForJson } from "./dataProcessing";
import { lib } from "./settigs";

function DragZones({ currentNode, isSave, setIsSave }) {
  const { count, main, initialProps } = initialDragZones();
  const [state, setState] = useState({ count, main, target: null });

  const dragOver = e => {
    e.preventDefault();
  };
  const dragEnter = ({ target }) => {
    const targetComponent = recursSearchComponent(target);

    if (!targetComponent) return null;

    const parent = targetComponent.parentNode;

    setState({
      ...state,
      target: targetComponent,
      targetName: targetComponent.dataset.name,
      temp: true
    });

    if (state.target) {
      const enterParent = state.target.parentNode;
      enterParent.style.borderBottom = "none";
    }
    parent.style.transition = "0.2s";
    parent.style.borderBottom = "5px solid black";
  };
  const dragLeave = ({ target }) => {
    const targetComponent = recursSearchComponent(target);
    if (!targetComponent) return null;

    if (!state.temp) {
      if (!state.target) return null;

      const enterParent = state.target.parentNode;
      enterParent.style.borderBottom = "none";
      setState({ ...state, targetName: null, target: null, temp: null });
    }
    if (targetComponent.dataset.name === state.targetName) {
      setState({
        ...state,
        temp: null
      });
    } else {
      setState({ ...state, targetName: null, target: null, temp: null });
      const enterParent = state.target.parentNode;
      enterParent.style.borderBottom = "none";
    }
  };
  const dragDrop = ({ target }) => {
    if (state.target) {
      const enterParent = state.target.parentNode;
      enterParent.style.borderBottom = "none";
    }
    const appropriateComponent = getComponent(currentNode.target);

    const newBundleComponent = {
      key: state.count + 1,
      Component: appropriateComponent,
      name: currentNode.target
    };
    const stateObjComponent = dropAfterComponent(newBundleComponent, target);

    setState({
      ...state,
      target: null,
      targetName: null,
      count: state.count + 1,
      main: stateObjComponent
    });
  };
  const dropAfterComponent = (droppable, target) => {
    const onDropTarget = recursSearchComponent(target);
    const components = Array.from(state.main);

    if (!onDropTarget) {
      components.push(droppable);
      return components;
    }
    state.main.forEach(({ name, key }, index) => {
      if (`${name + key}` === onDropTarget.dataset.name) {
        components.splice(++index, 0, droppable);
      }
    });
    return components;
  };
  const recursSearchComponent = target => {
    if (target.dataset.zone) return null;
    return target.dataset.name
      ? target
      : recursSearchComponent(target.parentNode);
  };
  const saveGlobalSettings = objectProps => {
    const globalBandle = {
      ...objectProps,
      dropComponentData: {
        ...state,
        main: createArrForJson(state.main)
      }
    };
    localStorage.usedComponents = JSON.stringify(globalBandle);
    setIsSave(null);
  };

  const getComponent = componentName => lib[componentName].component;

  const checkClick = e => {
    if (e.target.dataset.btn === "btn-close") {
      const thatComponent = e.target.parentNode;
      state.main.forEach(({ key }, index) => {
        if (String(key) === thatComponent.dataset.key) {
          const stateArr = state.main;
          stateArr.splice(index, 1);
          setState({
            ...state,
            main: stateArr
          });
        }
      });
    }
  };

  return (
    <div data-global="global" onClick={checkClick} className="drag-zone">
      <ControlChanges
        isSave={isSave}
        initialProps={initialProps}
        dropZoneSetState={setState}
        dropZoneState={state}
        saveGlobalSettings={saveGlobalSettings}
        dragOver={dragOver}
        dragEnter={dragEnter}
        dragLeave={dragLeave}
        dragDrop={dragDrop}
      />
    </div>
  );
}
export default DragZones;
