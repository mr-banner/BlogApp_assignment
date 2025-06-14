import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../apis/api';

export function useCreatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (postData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/posts`, postData, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to create post';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

export function useUpdatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async ({ id, ...postData }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/posts/${id}`,
        postData,
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      return { ...postData, id };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update post';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

export function useDeletePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${API_BASE_URL}/posts/${id}`);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete post';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}