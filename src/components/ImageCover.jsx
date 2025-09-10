"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function ImageCover({ src, width, height, fill = false, priority = false }) {
  const [imgSrc, setImgSrc] = useState("/images/no-image.webp");

  useEffect(() => {
    if (src) {
      setImgSrc(src);
    } else {
      setImgSrc("/images/no-image.webp");
    }
  }, []);

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt="product-image"
        fill
        priority={priority}
        style={{ objectFit: "cover" }}
      />
    );
  } else {
    return (
      <Image
        src={imgSrc}
        alt="product-image"
        width={width}
        height={height}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
    );
  }
}
export default ImageCover;
