import React, { useEffect } from "react";
import ButtonDelete from "../Auxially/ButtonDelete";

function MainOne({ iterKey, saveComponentsData, componentsData }) {
    console.log(componentsData, "MAIN ONE COMP");
    const initialText =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, amet asperiores similique, doloremque veniam quasi molestias tempora debitis, eveniet impedit quam. Doloremque eius molestiae nisi ducimus accusamus, neque et repellendus!";
    useEffect(() => {
        //Инизиализация компонента в стейте контроля
        //Если данные о компоненте уже есть в стейте, то игнорирует инициализацию

        (!componentsData || !componentsData[`MainOne${iterKey}`]) &&
            saveComponentsData({
                componentName: `MainOne${iterKey}`,
                nodes: [
                    {
                        name: "Заголовок",
                        value: "",
                        type: "input"
                    },
                    {
                        name: "Описание",
                        value: "",
                        type: "area"
                    }
                ]
            });
    }, []);
    return (
        <div
            data-key={iterKey}
            data-name={
                (componentsData &&
                    componentsData[`MainOne${iterKey}`] &&
                    componentsData[`MainOne${iterKey}`].componentName) ||
                `MainOne${iterKey}`
            }
            className="mainOne mains component"
        >
            <ButtonDelete />
            <h2 className="mainOne__title">
                {(componentsData &&
                    componentsData[`MainOne${iterKey}`] &&
                    componentsData[`MainOne${iterKey}`].nodes[0].value) ||
                    "Custom title"}
            </h2>
            <p className="mainOne__text">
                {(componentsData &&
                    componentsData[`MainOne${iterKey}`] &&
                    componentsData[`MainOne${iterKey}`].nodes[1].value) ||
                    initialText}
            </p>
        </div>
    );
}
export default MainOne;
