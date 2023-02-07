import axios from 'axios';

console.log("Api enviornment: " + process.env.REACT_APP_ENV); // <- for testing

const rest = process.env.REACT_APP_ENV === 'production' ? axios : axios.create({
    baseURL: 'http://localhost:8000'
})


export const getUser = (email) => rest.get(`/api/user/${email}`)
export const getUsers = (email) => rest.get(`/api/users`)
export const createUser = (payload) => rest.post(`/api/user`, payload)
export const updateUser = (id, payload) => rest.put(`/api/user/${id}`, payload)

export const getBills = (id) => rest.get(`/api/bills/${id}`)
export const createBill = (payload) => rest.post(`/api/bill`, payload)
export const deleteBill = (id) => rest.delete(`/api/bill/${id}`)
export const updateBill = (id, payload) => rest.put(`/api/bill/${id}`, payload)


const apis = {
    getBills,
    createBill,
    deleteBill,
    updateBill,
    getUser,
    getUsers,
    createUser,
    updateUser
}

export default apis;