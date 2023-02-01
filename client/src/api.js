import axios from 'axios';

console.log("Api enviornment: " + process.env.REACT_APP_ENV); // <- for testing

const rest = process.env.REACT_APP_ENV === 'production' ? axios : axios.create({
    baseURL: 'http://localhost:8000'
})

// TASKS
export const getBills = () => rest.get(`/api/bills`).catch(err => console.error("request", err));
// export const createTask = (payload) => rest.post(`/api/task`, payload).catch(err => console.error("request", err));
// export const deleteTask = (id) => rest.delete(`/api/task/${id}`).catch(err => console.error("request", err));
// export const updateTask = (id, payload) => rest.put(`/api/task/${id}`, payload).catch(err => console.error("request", err));


const apis = {
    getBills,
    // createTask,
    // deleteTask,
    // updateTask
}

export default apis;