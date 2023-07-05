import React from "react";
import { lib } from "../settigs";
import { controlButtons } from "../constans";
import { getArrayComponents } from "../helpers/getArrayComponents";

const SideBar = ({ setIsGlobalSaveStart, setStartDraggable }) => {
  const svgSearch = target => {
    return target.dataset.svg ? target : svgSearch(target.parentNode);
  };

  const dragStart = e => {
    //начало движения подкатегории
    e.dataTransfer.setData("text/html", "dragstart"); //нужно для работы dnd в мозиле и еще некоторых браузеров
    setStartDraggable(prevState => ({
      //записываем в стейт название категории и подкатегории
      ...prevState,
      currentNode: {
        category: e.target.parentNode.parentNode.dataset.name.toLowerCase(),
        target: e.target.dataset.name
      }
    }));
  };

  const saveDoc = ({ target }) => {
    if (!target) return;
    const currentTarget = svgSearch(target);

    if (currentTarget?.dataset) {
      const clickedNode = currentTarget.dataset.svg;

      if (clickedNode === "disk") {
        setIsGlobalSaveStart(true);
      }
    }
  };

  const data = getArrayComponents(lib);

  return (
    <aside className="drag-category">
      <ul onClick={saveDoc} className="drag-bar">
        {controlButtons.map(({ Svg, status, name }, index) => (
          <li data-svg={name} key={index} className="drag-bar__item">
            {Svg(status)}
          </li>
        ))}
      </ul>
      <ul className="drag-list">
        {Object.keys(data).map((categoryName, index) => (
          <li
            data-name={categoryName}
            key={categoryName + index}
            className="drag-list__item"
          >
            <a className="drag-list__category-name">{categoryName}</a>
            <ul className="drag-sublist">
              {data[categoryName].map(({ name: componentName, id }) => (
                <li
                  data-name={componentName}
                  draggable
                  onDragStart={dragStart}
                  key={id}
                  className="drag-sublist__item"
                >
                  {componentName}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
