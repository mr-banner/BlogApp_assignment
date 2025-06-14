import axios from 'axios';

export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const jsonHeaders = {
  'Content-type': 'application/json'
};

export const getPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data;
};

export const getPost = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
  return response.data;
};

export const createPost = async (post) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, post, {
    headers: jsonHeaders
  });
  return response.data;
};

export const updatePost = async (id, post) => {
  const response = await axios.put(`${API_BASE_URL}/posts/${id}`, post, {
    headers: jsonHeaders
  });
  return response.data;
};

export const deletePost = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/posts/${id}`);
  return response.data;
};

export const getUser = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
  return response.data;
};

export const getComments = async (postId) => {
  const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
  return response.data;
};


export default {
  API_BASE_URL,
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getUser,
  getComments
};