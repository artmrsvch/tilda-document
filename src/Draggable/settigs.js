import React from "react";
import { HeaderOne, HeaderTwo, HeaderThree } from "./Headers/index";
import { MainOne, MainTwo, MainThree } from "./Mains/index";
import { FooterOne, FooterTwo, FooterThree } from "./Footers/index";

export const category = [
    { name: 'Header' },
    { name: 'Main' },
    { name: 'Footer' },
]
export const subCategory = [
    {
        name: 'Header',
        presents: [
            {
                subName: 'HeaderOne',
                component: <HeaderOne />
            },
            {
                subName: 'HeaderTwo',
                component: <HeaderTwo />
            },
            {
                subName: 'HeaderThree',
                component: <HeaderThree />
            },
        ]
    },
    {
        name: 'Main',
        presents: [
            {
                subName: 'MainOne',
                component: <MainOne />
            },
            {
                subName: 'MainTwo',
                component: <MainTwo />
            },
            {
                subName: 'MainThree',
                component: <MainThree />
            },

        ]
    },
    {
        name: 'Footer',
        presents: [
            {
                subName: 'FooterOne',
                component: <FooterOne />
            },
            {
                subName: 'FooterTwo',
                component: <FooterTwo />
            },
            {
                subName: 'FooterThree',
                component: <FooterThree />
            },
        ]
    },
]