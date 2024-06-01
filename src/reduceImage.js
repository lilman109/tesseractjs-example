export const reduceImageSize = async (
  imageUrl,
  maxWidth = 900,
  maxHeight = 500,
) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = image;
      let ratio = Math.min(maxWidth / width, maxHeight / height);
      let convertedWidth = Math.round(width * ratio);
      let convertedHeight = Math.round(height * ratio);

      resolve({ convertedWidth, convertedHeight });
    };

    image.onerror = reject;
  });
};
