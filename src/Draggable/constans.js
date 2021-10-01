import { Brush, Disk, Finder, Folder, Help, Quest } from "./assets";

export const controlButtons = [
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
