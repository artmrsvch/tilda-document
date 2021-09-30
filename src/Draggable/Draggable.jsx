import React, { useState } from "react";
import { category } from "./settigs";
import DragZones from "./DragZones";
import { DragDropContext } from "react-beautiful-dnd";
import { Disk, Brush, Finder, Quest, Folder, Help } from "./assets/index";

function Draggable() {
    const arraySvg = [
        {
            status: false,
            name: "disk",
            Svg: Disk
        },
        {
            status: false,
            name: "finder",
            Svg: Finder
        },
        {
            status: false,
            name: "brush",
            Svg: Brush
        },
        {
            status: false,
            name: "folder",
            Svg: Folder
        },
        {
            status: true,
            name: "quest",
            Svg: Quest
        },
        {
            status: false,
            name: "help",
            Svg: Help
        }
    ];
    const [state, setState] = useState({ currentNode: null, icoSvg: arraySvg });
    const [isSave, setIsSave] = useState(null);

    const dragStart = e => {
        //начало движения подкатегории
        e.dataTransfer.setData("text/html", "dragstart"); //нужно для работы dnd в мозиле и еще некоторых браузеров
        setState({
            //записываем в стейт название категории и подкатегории
            ...state,
            currentNode: {
                category: e.target.parentNode.parentNode.dataset.name.toLowerCase(),
                target: e.target.dataset.name
            }
        });
    };
    const svgSearch = target => {
        return target.dataset.svg ? target : svgSearch(target.parentNode);
    };
    const saveDoc = ({ target }) => {
        if (!target) return;
        const currentTarget = svgSearch(target)

        if (currentTarget?.dataset) {
            const clickedNode = currentTarget.dataset.svg;

            if (clickedNode === "disk") {
                setIsSave(true);
            }
        }


    };
    return (
        <section className="drag">
            <div className="container">
                <aside className="drag-category">
                    <ul onClick={saveDoc} className="drag-bar">
                        {arraySvg.map(({ Svg, status, name }, index) => (
                            <li data-svg={name} key={index} className="drag-bar__item">
                                {Svg(status)}
                            </li>
                        ))}
                    </ul>
                    <ul className="drag-list">
                        {category.map(({ name, presents }, id) => (
                            <li data-name={name} key={id} className="drag-list__item">
                                <a className="drag-list__category-name">{name}</a>
                                <ul className="drag-sublist">
                                    {presents.map(({ subName }, id) => (
                                        <li
                                            data-name={subName}
                                            draggable
                                            onDragStart={dragStart}
                                            key={id}
                                            className="drag-sublist__item"
                                        >
                                            {subName}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </aside>
                <DragDropContext>
                    <DragZones
                        isSave={isSave}
                        setIsSave={setIsSave}
                        category={category}
                        currentNode={state.currentNode}
                    />
                </DragDropContext>
            </div>
        </section>
    );
}

export default Draggable;
