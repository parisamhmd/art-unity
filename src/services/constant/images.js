import { imagesProxy } from "../utils/proxies/imagesProxy";

const imagesBasePath = "../constant/assets/";

const imagesInnerPaths = {
  icons: "Icons",
  image: "Img",
  mock: "mock",
};

const icons = {
  artists: "artists-icon.svg",
  angleDownDisabled: "angle-down-disabled.svg",
};

const mock = {};

const img = {};

const allImages = {
  icons,
  img,
  mock,
};

export const images = imagesProxy(imagesBasePath, allImages, imagesInnerPaths);
