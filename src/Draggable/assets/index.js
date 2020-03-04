import React from "react";

const Brush = fill => {
    return (
        <svg
            fill={fill ? "#05c35a" : "#b1b1b1"}
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="Brush">
                <path d="M6.38,14A3.33,3.33,0,0,0,3,17.5c0,2.16-1.88,4.67-1.9,4.7a.5.5,0,0,0,.38.8h.1a17.49,17.49,0,0,0,3.57-.46C7.83,22,10,19.75,10,17.61A3.62,3.62,0,0,0,6.38,14Z" />
                <path d="M10.59,11.29a.5.5,0,0,0-.71,0L8.41,12.76a.5.5,0,0,0,.12.8,4.6,4.6,0,0,1,1.92,1.91.5.5,0,0,0,.37.26h.07a.5.5,0,0,0,.35-.15l1.47-1.47a.5.5,0,0,0,0-.71Z" />
                <path d="M21,1a2,2,0,0,0-1.41.59L11.29,9.88a.5.5,0,0,0,0,.71l2.12,2.12a.5.5,0,0,0,.71,0l8.29-8.29A2,2,0,0,0,21,1Z" />
            </g>
        </svg>
    );
};
const Disk = fill => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22px"
            height="22px"
            version="1.1"
            viewBox="0 0 500 500"
        >
            <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer" />
                <path
                    fill={fill ? "#05c35a" : "#b1b1b1"}
                    d="M365 30l0 101c0,3 -2,5 -5,5l-63 0c-3,0 -5,-2 -5,-5l0 -101 -188 0 0 121c0,8 7,15 15,15l262 0c8,0 15,-7 15,-15l0 -121 -31 0zm-250 364l270 0 0 10 -270 0 0 -10zm0 -35l270 0 0 10 -270 0 0 -10zm0 -35l270 0 0 10 -270 0 0 -10zm0 -35l270 0 0 10 -270 0 0 -10zm-32 180l334 0 0 -220 -334 0 0 220zm-37 -449c127,0 255,0 382,0l52 52 0 382c0,14 -12,26 -26,26 -136,0 -272,0 -408,0 -14,0 -26,-12 -26,-26l0 -408c0,-14 12,-26 26,-26zm-10 360l10 0c6,0 11,5 11,10l0 16c0,6 -5,11 -11,11l-10 0 0 -37z"
                />
            </g>
        </svg>
    );
};
const Finder = fill => {
    return (
        <svg
            enable-background="new 0 0 512 512"
            height="22px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 512 512"
            width="22px"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g>
                <path
                    d="M272,80c0,17.563-7.953,33.453-20.844,45.016c-7.094,6.359-15.938,11.578-15.938,26.563v1.328   c0,1.5,0.641,2.938,1.766,3.953c1.125,1,2.609,1.5,4.109,1.344c32.828-3.516,89.188-10.953,105.5-13.734   c10.422-1.797,21.063,1.688,28.422,9.297c5.813,6.03,8.985,14.03,8.985,22.233c0,2.156-0.219,4.328-0.672,6.484   c-2.797,16.313-10.031,55.594-13.531,88.422c-0.156,1.5,0.328,2.984,1.344,4.109c1,1.125,2.438,1.766,3.953,1.766h1.313   c15,0,20.219-8.844,26.594-15.938C414.547,247.953,430.438,240,448,240c35.344,0,64,32.219,64,72s-28.656,72-64,72   c-17.563,0-33.453-7.953-45-20.844c-6.375-7.094-11.594-15.938-26.594-15.938h-1.313c-1.516,0-2.953,0.642-3.953,1.767   c-1.016,1.125-1.5,2.608-1.344,4.108c3.5,32.828,10.75,72.109,13.547,88.422c0.438,2.156,0.656,4.328,0.656,6.484   c0,8.438-3.344,16.641-9.453,22.719C366.859,478.328,352,480,345.281,480c-0.617,0-57.281,0-101.93,0   c-1.484,0-2.719-1.25-3.141-2.672c-0.141-0.484-0.211-0.984-0.211-1.5v-9.25c0-26.547,32-19.547,32-66.797   c0-35.344-32.219-64-72-64s-72,28.656-72,64c0,35.25,31.938,41.5,31.938,68.391v7.656c0,0.016,0,0.016,0,0.031   c-0.016,2.125-1.602,4.141-3.727,4.141c-44.21,0-100.89,0-101.507,0c-6.703,0-21.734-1.719-29.406-9.453   C19.281,464.484,16,456.359,16,448c0-2.297,0.25-4.625,0.75-6.922c0.172-0.75,18.445-76.719,18.445-137.063   c0-59.173-17.867-118.892-18.039-119.484C16.39,181.718,16,178.859,16,176.015c0-7.828,2.891-15.516,8.281-21.484   c7.344-8.109,18.328-11.922,29.125-10.063c16.313,2.781,72.672,10.219,105.5,13.734c1.5,0.156,2.984-0.344,4.109-1.344   c1.125-1.016,1.766-2.453,1.766-3.953v-1.328c0-14.984-8.844-20.203-15.938-26.563C135.953,113.453,128,97.563,128,80   c0-35.344,32.219-64,72-64S272,44.656,272,80z"
                    fill={fill ? "#05c35a" : "#b1b1b1"}
                />
            </g>
        </svg>
    );
};
const Folder = fill => {
    return (
        <svg
            enable-background="new 0 0 512 512"
            height="22px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 512 512"
            width="22px"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                clip-rule="evenodd"
                d="M509.353,184.142c-1.49,4.875-65.969,233.052-65.969,233.052  c0,10.726-8.687,19.421-19.403,19.421H20.403C9.687,436.616,1,427.921,1,417.195L70.85,172.49  c2.678-11.572,12.568-19.421,23.284-19.421H486.07C514.751,153.069,512.198,174.835,509.353,184.142z M55.328,156.953L1,347.279  v-221.4V94.805c0-10.726,8.687-19.421,19.403-19.421h151.342c10.716,0,19.403,8.695,19.403,19.421v11.653h232.833  c10.716,0,19.403,8.695,19.403,19.421v11.652H78.611C67.895,137.531,58.006,145.38,55.328,156.953z"
                fill-rule="evenodd"
                fill={fill ? "#05c35a" : "#b1b1b1"}
            />
        </svg>
    );
};
const Help = fill => {
    return (
        <svg
            height="24px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill={fill ? "#05c35a" : "#b1b1b1"}
                d="M12,2C6.4771729,2,2,6.4771118,2,12c0,5.5228271,4.4771729,10,10,10s10-4.4771729,10-10C22,6.4771118,17.5228271,2,12,2z   M13,19h-2v-2h2V19z M14.340332,12.2441406C13.4887695,12.8603516,13,13.7275391,13,14.6230469V15h-2v-0.3769531  c0-1.5458984,0.7905273-3.0039063,2.1689453-4c0.628418-0.4541016,0.9345703-1.2177734,0.7983398-1.9941406  c-0.1381836-0.7861328-0.8095703-1.4580078-1.5966797-1.5957031c-0.6074219-0.1083984-1.1948242,0.046875-1.6552734,0.4335938  C10.2607422,7.8486328,10,8.4072266,10,9H8c0-1.1845703,0.5209961-2.3017578,1.4291992-3.0644531  c0.9077148-0.7617188,2.1088867-1.0771484,3.2871094-0.8730469c1.612793,0.2832031,2.9375,1.6074219,3.2207031,3.2207031  C16.206543,9.8203125,15.5947266,11.3378906,14.340332,12.2441406z"
            />
        </svg>
    );
};
const Quest = fill => {
    return (
        <svg
            data-name="Layer 1"
            id="Layer_1"
            height="24px"
            width="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill={fill ? "#05c35a" : "#b1b1b1"}
        >
            <path
                fill="none"
                d="M12,2a10,10,0,1,0,7.07,2.93A10,10,0,0,0,12,2Zm6,11H13v5a1,1,0,0,1-2,0V13H6a1,1,0,0,1,0-2h5V6a1,1,0,0,1,2,0v5h5A1,1,0,0,1,18,13Z"
            />
            <path d="M12,24A12,12,0,1,0,0,12,12,12,0,0,0,12,24ZM4.93,4.93A10,10,0,1,1,2,12,10,10,0,0,1,4.93,4.93Z" />
            <path d="M6,13h5v5a1,1,0,0,0,2,0V13h5a1,1,0,0,0,0-2H13V6a1,1,0,0,0-2,0v5H6A1,1,0,0,0,6,13Z" />
        </svg>
    );
};

export { Disk, Brush, Finder, Quest, Folder, Help };
