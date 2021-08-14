import myProxy from "./index";

export const imagesProxy = (imagesBasePath, allImages, imagesInnerPaths) =>
  new myProxy(allImages, {
    get(target, p, r) {
      if (p in target) {
        const image = target[p];
        const innerPath = imagesInnerPaths[p];
        let baseAddress;
        if (innerPath !== "") {
          baseAddress = `${imagesBasePath}${innerPath}/`;
        } else {
          baseAddress = `${imagesBasePath}${innerPath}`;
        }
        return new myProxy(image, {
          get(innerTarget, prop, receiver) {
            if (prop in innerTarget) {
              const imageName = innerTarget[prop];
              console.log(`${baseAddress}${imageName}`);
              return `${baseAddress}${imageName}`;
            }
            return Reflect.get(innerTarget, prop, receiver);
          },
        });
      }
      return Reflect.get(target, p, r);
    },
  });
