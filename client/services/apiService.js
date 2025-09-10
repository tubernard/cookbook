import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/',
  withCredentials: true,
});

/**
 * Uploads a file to Cloudinary using a signed upload flow.
 * @param {File} file The file object from the form input.
 * @returns {Promise<string>} The secure URL of the uploaded image.
 */
export const uploadImage = async (file) => {
  // Use the pre-configured 'api' instance
  const { data: signData } = await api.get('/api/upload/sign');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
  formData.append('timestamp', signData.timestamp);
  formData.append('signature', signData.signature);
  formData.append('folder', signData.folder);
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
  try {
    const { data } = await api.post('/api/recipes', recipeData);
    return data;
  } catch (error) {
    const newError = new Error('Validation failed');
    newError.errors = error.response?.data?.errors || [];
    throw newError;
  }
};

/**
 * Fetches all recipes for the user.
 * @returns {Promise<object>} The recipe object.
 */
export const getRecipes = async () => {
  try {
    const { data } = await api.get(`/api/recipes`);
    return data;
  } catch (error) {
    const newError = new Error('Error fetching recipes');
    newError.errors = error.response?.data?.errors || [];
    throw newError;
  }
};
/**
 * Fetches a single recipe by its ID.
 * @param {string} id The ID of the recipe.
 * @returns {Promise<object>} The recipe object.
 */
export const getRecipeById = async (id) => {
  const { data } = await api.get(`/api/recipes/${id}`);
  return data;
};

/**
 * Updates an existing recipe.
 * @param {string} id The ID of the recipe to update.
 * @param {object} recipeData The updated recipe data.
 * @returns {Promise<object>} The updated recipe object from the server.
 */
export const updateRecipe = async (id, recipeData) => {
  try {
    const { data } = await api.put(`/api/recipes/${id}`, recipeData);
    return data;
  } catch (error) {
    const newError = new Error('Validation failed');
    newError.errors = error.response?.data?.errors || [];
    throw newError;
  }
};

/**
 * Deletes a recipe by its ID.
 * @param {string} id The ID of the recipe to delete.
 * @returns {Promise<object>} The success message from the server.
 */
export const deleteRecipe = async (id) => {
  const { data } = await api.delete(`/api/recipes/${id}`);
  return data;
};

/**
 * Signs up a new user.
 * @param {object} credentials The user's credentials { username, password }.
 * @returns {Promise<object>} The new user object.
 */
export const signup = async (credentials) => {
  const { data } = await api.post('/api/users/signup', credentials);
  return data;
};

/**
 * Logs in a user.
 * @param {object} credentials The user's credentials { username, password }.
 * @returns {Promise<object>} The user object.
 */
export const login = async (credentials) => {
  const { data } = await api.post('/api/users/login', credentials);
  return data;
};

/**
 * Logs out the current user.
 * @returns {Promise<object>} The success message.
 */
export const logout = async () => {
  const { data } = await api.post('/api/users/logout');
  return data;
};

/**
 * Checks if a user session is active.
 * @returns {Promise<object|null>} The user object if logged in, otherwise null.
 */
export const checkSession = async () => {
  try {
    const { data } = await api.get('/api/users/session');
    return data;
  } catch {
    // A 401 or other error means no active session
    return null;
  }
};
