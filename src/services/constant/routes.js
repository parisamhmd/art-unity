import AppsIcon from "@material-ui/icons/Apps";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GroupIcon from "@material-ui/icons/Group";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import StarIcon from "@material-ui/icons/Star";

export const routes = [
  {
    path: "/artists",
    title: "هنرمندان",
    icon: <GroupIcon />,
  },
  {
    path: "/topics",
    title: "تاپیک ها",
    icon: <AppsIcon />,
  },
  {
    path: "/categories",
    title: "طبقه بندی ها",
    icon: <BrightnessLowIcon />,
  },
  {
    path: "/skills",
    title: "مهارت ها  ",
    icon: <StarIcon />,
  },
  {
    path: "/blog",
    title: "بلاگ",
    icon: <FavoriteIcon />,
  },
  {
    path: "/artworks",
    title: "آثار هنری ",
    icon: <ColorLensIcon />,
  },
];
