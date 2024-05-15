import { useEffect, useState } from "react";
import { Dimensions, Image } from "react-native";

export const PortfolioDetailControler = ({ item }) => {
  const [imageSizes, setImageSizes] = useState([]);
  const [userName, setUserName] = useState([]);

  useEffect(() => {
    const calculateImageSizes = async () => {
      const sizes = await Promise.all(item.url.map((uri) => getImageSize(uri)));
      setImageSizes(sizes);
    };

    calculateImageSizes();
  }, [item.url]);

  const getImageSize = (uri) => {
    return new Promise((resolve, reject) => {
      Image.getSize(
        uri,
        (width, height) => {
          const aspectRatio = width / height;
          const imageWidth = Dimensions.get("window").width;
          const imageHeight = imageWidth / aspectRatio;
          resolve({ width: imageWidth, height: imageHeight });
        },
        reject
      );
    });
  };

  return { imageSizes, userName };
};
