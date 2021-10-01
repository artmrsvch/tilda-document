import { HeaderOne, HeaderTwo, HeaderThree } from "./Headers/index";
import { MainOne, MainTwo, MainThree } from "./Mains/index";
import { FooterOne, FooterTwo, FooterThree } from "./Footers/index";

export const category = [
  {
    name: "Header",
    presents: [
      {
        subName: "HeaderOne",
        component: HeaderOne
      },
      {
        subName: "HeaderTwo",
        component: HeaderTwo
      },
      {
        subName: "HeaderThree",
        component: HeaderThree
      }
    ]
  },
  {
    name: "Main",
    presents: [
      {
        subName: "MainOne",
        component: MainOne
      },
      {
        subName: "MainTwo",
        component: MainTwo
      },
      {
        subName: "MainThree",
        component: MainThree
      }
    ]
  },
  {
    name: "Footer",
    presents: [
      {
        subName: "FooterOne",
        component: FooterOne
      },
      {
        subName: "FooterTwo",
        component: FooterTwo
      },
      {
        subName: "FooterThree",
        component: FooterThree
      }
    ]
  }
];
export const lib = {
  HeaderOne: {
    id: 1,
    category: "HEADER",
    component: HeaderOne
  },
  HeaderTwo: {
    id: 2,
    category: "HEADER",
    component: HeaderTwo
  },
  HeaderThree: {
    id: 3,
    category: "HEADER",
    component: HeaderThree
  },
  MainOne: {
    id: 4,
    category: "MAIN",
    component: MainOne
  },
  MainTwo: {
    id: 5,
    category: "MAIN",
    component: MainTwo
  },
  MainThree: {
    id: 6,
    category: "MAIN",
    component: MainThree
  },
  FooterOne: {
    id: 7,
    category: "FOOTER",
    component: FooterOne
  },
  FooterTwo: {
    id: 8,
    category: "FOOTER",
    component: FooterTwo
  },
  FooterThree: {
    id: 9,
    category: "FOOTER",
    component: FooterThree
  }
};
