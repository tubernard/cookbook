/**
 * Applies a Cloudinary named transformation to an image URL.
 * @param {string} url The original Cloudinary image URL.
 * @param {string} transformationName The name of the transformation (e.g., 'recipe_card_thumb').
 * @returns {string} The new URL with the transformation applied.
 */
export const applyCloudinaryTransformation = (url, transformationName) => {
  if (!url || !transformationName) {
    return url;
  }

  const parts = url.split('/upload/');
  if (parts.length !== 2) {
    return url;
  }

  return `${parts[0]}/upload/t_${transformationName}/${parts[1]}`;
};
