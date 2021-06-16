import Image from "next/image";
import PropTypes from "prop-types";

const NextImage = ({ node }) => {
  return (
    <Image
      {
        ...node.properties // img tag attribute
      }
      {
        ...node.imageDimensions // width and height
      }
    />
  );
};

NextImage.propTypes = {
  node: PropTypes.object,
};

export default NextImage;
