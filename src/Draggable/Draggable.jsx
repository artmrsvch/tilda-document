import React, { useState } from "react";
import ReactDOM from "react-dom";
import { category, subCategory } from "./settigs";
import DragZones from "./DragZones";

function Draggable() {
    const [state, setState] = useState({ isOpen: false, subArray: null });
    let currentNode;
    const dragStart = e => {
        e.dataTransfer.setData("text/html", "dragstart");
        currentNode = {
            category: state.category,
            target: e.target.textContent
        };
    };
    const dragEnd = e => {};
    const dragEnter = ({ target }) => {
        target.style.border = "2px dashed black";
    };
    const dragLeave = ({ target }) => {
        target.style.border = "none";
    };
    const dragOver = e => e.preventDefault();

    const dragDrop = ({ target }) => {
        target.style.border = "none";
        if (target.getAttribute("zone") === currentNode.category) {
            ReactDOM.render(getComponent(currentNode.category, currentNode.target), target);
        }
    };
    const getComponent = (category, name) => {
        let temp;
        subCategory.forEach(arr => {
            if (arr.name === category) {
                arr.presents.forEach(objComponet => {
                    if (objComponet.subName === name) {
                        temp = objComponet.component;
                    }
                });
            }
        });
        return temp;
    };
    const findSubCategory = name => {
        let tempArr;
        subCategory.forEach(arr => {
            if (arr.name === name) {
                tempArr = arr.presents;
            }
        });
        return tempArr;
    };
    const closeSubList = ({ target }) => {
        const list = target.parentNode;
        list.style.transition = "0.3s";
        list.style.padding = "0";
        list.style.overflow = "hidden";
        list.style.width = "0";
        setState({ ...state, subArray: null, isOpen: false });
    };
    const clickForCategory = ({ target }) => {
        const subCategory = target.parentNode.parentNode.children[1];
        const result = findSubCategory(target.textContent);

        subCategory.style.transition = "0.3s";
        subCategory.style.padding = "30px 25px";
        subCategory.style.overflow = "auto";
        subCategory.style.width = "25%";
        setState({ category: target.textContent, subArray: result, isOpen: true });
    };
    return (
        <section className="drag">
            <div className="container">
                <ul className="drag-category">
                    {category.map(({ name }, id) => (
                        <li key={id} onClick={clickForCategory} className="drag-category__item">
                            {name}
                        </li>
                    ))}
                </ul>
                <div className="drag-subCategory">
                    <div onClick={closeSubList} className="drag-subCategory__btn"></div>

                    <ul className="drag-subCategory__list">
                        {state.subArray &&
                            state.subArray.map(({ subName }, id) => (
                                <li
                                    draggable
                                    onDragStart={dragStart}
                                    onDragEnd={dragEnd}
                                    key={id}
                                    className="drag-subCategory__item"
                                >
                                    {subName}
                                </li>
                            ))}
                    </ul>
                </div>
                <DragZones
                    dragDrop={dragDrop}
                    dragOver={dragOver}
                    dragEnter={dragEnter}
                    dragLeave={dragLeave}
                />
            </div>
        </section>
    );
}

export default Draggable;
