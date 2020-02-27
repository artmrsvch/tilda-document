import React, { useState } from "react";
import { category } from "./settigs";
import DragZones from "./DragZones";
import { DragDropContext } from "react-beautiful-dnd";

function Draggable() {
    const [state, setState] = useState({ subArray: null, currentNode: null });

    const dragStart = e => {
        //начало движения подкатегории
        e.dataTransfer.setData("text/html", "dragstart"); //нужно для работы dnd в мозиле и еще некоторых браузеров
        setState({
            //записываем в стейт название категории и подкатегории
            ...state,
            currentNode: {
                category: state.category,
                target: e.target.dataset.name
            }
        });
    };

    const findSubCategory = name => {
        //поиск подкатегории,принимает название категории, возвращает массив с компонентами категории
        let tempArr;
        category.forEach(objectCategory => {
            //цикл по массиву категорий
            if (objectCategory.name.toLowerCase() === name) {
                //совпадение по названию категории
                tempArr = objectCategory.presents; //записываем в переменную соответсвующий массив подкатегории
            }
        });
        return tempArr;
    };
    const closeSubList = ({ target }) => {
        //закрыть список подкатегорий
        const list = target.parentNode; //элемент списка
        list.style.transition = "0.3s"; //сворачиваем список подкатегорий
        list.style.padding = "0";
        list.style.overflow = "hidden";
        list.style.width = "0";
        setState({ ...state, subArray: null }); //обнуляем в стейте массив подкатегорий
    };
    const clickForCategory = ({ target }) => {
        //клик по категории
        const subCategory = target.parentNode.parentNode.children[1]; //доступ к списку подкатегорий
        const result = findSubCategory(target.dataset.name); //сохраняем массив подкатегорий

        subCategory.style.transition = "0.3s"; //разворачиваем список подкатегорий
        subCategory.style.padding = "30px 25px";
        subCategory.style.overflow = "auto";
        subCategory.style.width = "25%";
        setState({ category: target.dataset.name, subArray: result }); // записываем в стейт список элементов в подкатегории  и название категории
    };
    return (
        <section className="drag">
            <div className="container">
                <ul className="drag-category">
                    {category.map(({ name }, id) => (
                        <li
                            data-name={name.toLowerCase()}
                            key={id}
                            onClick={clickForCategory}
                            className="drag-category__item"
                        >
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
                                    data-name={subName.toLowerCase()}
                                    draggable
                                    onDragStart={dragStart}
                                    key={id}
                                    className="drag-subCategory__item"
                                >
                                    {subName}
                                </li>
                            ))}
                    </ul>
                </div>
                <DragDropContext>
                    <DragZones category={category} currentNode={state.currentNode} />
                </DragDropContext>
            </div>
        </section>
    );
}

export default Draggable;
