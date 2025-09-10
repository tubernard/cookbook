import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/' });

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const payload = JSON.parse(atob(parts[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && !isTokenExpired) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (token && isTokenExpired) {
    localStorage.removeItem('token');
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  },
);

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
 * Logs out the current user by removing JWT.
 */
export const logout = () => {
  localStorage.removeItem('token');
};
