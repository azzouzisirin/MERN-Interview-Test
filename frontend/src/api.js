import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getAllDrawings = () => axios.get(`${API_URL}/drawings`);
export const getDrawingById = (id) => axios.get(`${API_URL}/drawings/${id}`);
