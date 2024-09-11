import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getDrawings = async () => {
  try {
    const response = await axios.get(`${API_URL}/drawings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching drawings:', error);
    throw error;
  }
};

export const getDrawing = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/drawings/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching drawing:', error);
    throw error;
  }
};
export const createDrawing = async (drawingData) => {
  try {
    console.log(drawingData)

    const response = await axios.post(`${API_URL}/drawings`, drawingData);
    return response.data;
  } catch (error) {
    console.error('Error creating drawing:', error.response?.data || error.message);
    throw new Error(`API Error: ${error.response?.status} - ${error.response?.data.message || error.message}`);
  }
};

export const updateDrawing = async (id, drawing) => {
  try {
    const response = await axios.put(`${API_URL}/drawings/${id}`, drawing);
    return response.data;
  } catch (error) {
    console.error('Error updating drawing:', error);
    throw error;
  }
};

export const deleteDrawing = async (id) => {
  try {
    await axios.delete(`${API_URL}/drawings/${id}`);
  } catch (error) {
    console.error('Error deleting drawing:', error);
    throw error;
  }
};
