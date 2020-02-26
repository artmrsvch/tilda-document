import React from "react";
import ButtonDelete from "../Auxially/ButtonDelete";

function MainOne({ iterKey }) {
    return (
        <div data-key={iterKey} data-name="MainOne" className="mainOne mains component">
            <ButtonDelete />
            <p className="mainOne__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, amet asperiores
                similique, doloremque veniam quasi molestias tempora debitis, eveniet impedit quam.
                Doloremque eius molestiae nisi ducimus accusamus, neque et repellendus! Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Molestiae laudantium, exercitationem
                accusantium dolores hic vitae nesciunt veniam tempore enim fuga? Quis alias quaerat
                eius nisi est, corporis rem nostrum commodi. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Molestiae laudantium, exercitationem accusantium dolores hic vitae
                nesciunt veniam tempore enim fuga? Quis alias quaerat eius nisi est, corporis rem
                nostrum commodi.
            </p>
        </div>
    );
}
export default MainOne;
