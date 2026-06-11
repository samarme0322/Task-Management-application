// this is api helper file, all api calls go here
import axios from 'axios';

// base url of backend
const API_URL = 'http://localhost:5000/api';

// this function add token to headers automatically
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };
};

// auth apis
export const registerUser = (data) => axios.post(API_URL + '/auth/register', data);
export const loginUser = (data) => axios.post(API_URL + '/auth/login', data);

// task apis for normal user
export const createTask = (data) => axios.post(API_URL + '/tasks', data, getHeaders());
export const getMyTasks = () => axios.get(API_URL + '/tasks', getHeaders());
export const updateTask = (id, data) => axios.put(API_URL + '/tasks/' + id, data, getHeaders());
export const deleteTask = (id) => axios.delete(API_URL + '/tasks/' + id, getHeaders());

// admin apis
export const getAllUsers = () => axios.get(API_URL + '/admin/users', getHeaders());
export const deleteUser = (id) => axios.delete(API_URL + '/admin/users/' + id, getHeaders());
export const updateUserStatus = (id, status) => axios.put(API_URL + '/admin/users/' + id + '/status', { status }, getHeaders());
export const getAllTasksAdmin = () => axios.get(API_URL + '/admin/tasks', getHeaders());
export const adminDeleteTask = (id) => axios.delete(API_URL + '/admin/tasks/' + id, getHeaders());
export const getStats = () => axios.get(API_URL + '/admin/stats', getHeaders());

// activity logs api
export const getActivityLogs = () => axios.get(API_URL + '/activity', getHeaders());
