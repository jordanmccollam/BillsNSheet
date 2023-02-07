import axios from 'axios';

console.log("Api enviornment: " + process.env.REACT_APP_ENV); // <- for testing

const rest = process.env.REACT_APP_ENV === 'production' ? axios : axios.create({
    baseURL: 'http://localhost:8000'
})

export const getBills = () => rest.get(`/api/bills`).catch(err => console.error("request", err));
export const createBill = (payload) => rest.post(`/api/bill`, payload).catch(err => console.error("request", err));
export const deleteBill = (id) => rest.delete(`/api/bill/${id}`).catch(err => console.error("request", err));
export const updateBill = (id, payload) => rest.put(`/api/bill/${id}`, payload).catch(err => console.error("request", err));


const apis = {
    getBills,
    createBill,
    deleteBill,
    updateBill
}

export default apis;