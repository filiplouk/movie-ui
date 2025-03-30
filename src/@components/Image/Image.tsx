import { useState } from "react";
import classes from "./Image.module.scss";

type ImageProps = {
  src: string;
  alt: string;
  placeholder: string;
  className: string;
  cover?: boolean;
};

const Image = ({
  src,
  alt,
  placeholder,
  className,
  cover,
  ...props
}: ImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${classes.image} ${cover && "cover"} w-100`} {...props}>
      {!loaded && (
        <img
          src={placeholder}
          alt="Image Placeholder"
          className={classes.placeholder}
        />
      )}

      <img
        src={src}
        alt={alt}
        className={`${classes.original} ${className} ${loaded && "loaded"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default Image;
