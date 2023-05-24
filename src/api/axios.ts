import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://engineering-task.elancoapps.com/api'

// Create an instance of Axios with custom configuration
const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL, // Replace with your API base URL
});


export default instance;
