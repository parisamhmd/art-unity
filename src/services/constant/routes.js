import { images } from "./images";
import artistsIcon from "../assets/Icons/artists-icon.svg";
import ArworksIcon from "../assets/Icons/Artworks-Icon.svg";
import MagIcon from "../assets/Icons/Mag-Icon.svg";
export const routes = [
  { path: "/artists", title: "هنرمندان", icon: artistsIcon },
  { path: "/arts", title: "آثار هنری ", icon: ArworksIcon },
  { path: "/customers", title: "دسته بندی ها  ", icon: MagIcon },
  { path: "/blog", title: "بلاگ ", icon: images.icons.artists },
];
