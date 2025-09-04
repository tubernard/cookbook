/**
 * Uploads a file to Cloudinary using a signed upload flow.
 * @param {File} file The file object from the form input.
 * @returns {Promise<string>} The secure URL of the uploaded image.
 */
export const uploadImage = async (file) => {
  const signResponse = await fetch('/api/upload/sign');
  if (!signResponse.ok) {
    throw new Error('Failed to get upload signature.');
  }
  const { timestamp, signature, folder } = await signResponse.json();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  formData.append('folder', folder);
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  );

  const cloudinaryResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData },
  );

  if (!cloudinaryResponse.ok) {
    throw new Error('Image upload to Cloudinary failed.');
  }

  const cloudinaryData = await cloudinaryResponse.json();
  return cloudinaryData.secure_url;
};

/**
 * Saves a new recipe to the backend API.
 * @param {object} recipeData The recipe data to save.
 * @returns {Promise<object>} The newly created recipe object from the server.
 */
export const createRecipe = async (recipeData) => {
  const response = await fetch('/api/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipeData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error('Validation failed');
    error.errors = errorData.errors;
    throw error;
  }

  return response.json();
};
