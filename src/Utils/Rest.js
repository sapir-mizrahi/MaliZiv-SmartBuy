import axios from "axios"

let apiUrl = "https://localhost:8080"

export const login = async (email, password) => {
    const res = await axios.post(`${apiUrl}/login/${email}/${password}`);
    return res;
}

export const signUp = async (user) => {
    const res = await axios.post(`${apiUrl}/signup`, user);
    return res;
}

export const getList = async (userId) => {
    const res = await axios.get(`${apiUrl}/getList/${userId}`);
    return res;
}

export const updateList = async (userId, list) => {
    const res = await axios.put(`${apiUrl}/updateList`, userId, list);
    return res;
}

export const newList = async (userId, list, date) => {
    const res = await axios.post(`${apiUrl}/newList`, userId, list, date);
    return res;
}

export const getHistory = async (userId) => {
    const res = await axios.get(`${apiUrl}/history/${userId}`);
    return res;
}
