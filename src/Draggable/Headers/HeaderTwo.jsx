import React, { useEffect } from "react";
import ButtonDelete from "../Auxially/ButtonDelete";

function HeaderTwo({ iterKey, saveComponentsData, componentsData }) {
    useEffect(() => {
        (!componentsData || !componentsData[`HeaderTwo${iterKey}`]) &&
            saveComponentsData({
                componentName: `HeaderTwo${iterKey}`,
                nodes: [
                    {
                        name: "Заголовок",
                        value: "",
                        type: "input"
                    }
                ]
            });
    }, []);
    return (
        <div
            data-key={iterKey}
            data-name={
                (componentsData &&
                    componentsData[`HeaderTwo${iterKey}`] &&
                    componentsData[`HeaderTwo${iterKey}`].componentName) ||
                "HeaderTwo"
            }
            className="headerTwo titles component"
        >
            <ButtonDelete />
            <h1 className="headerTwo__title">
                {(componentsData &&
                    componentsData[`HeaderTwo${iterKey}`] &&
                    componentsData[`HeaderTwo${iterKey}`].nodes[0].value) ||
                    "Amaizing One Title"}
            </h1>
        </div>
    );
}
export default HeaderTwo;
