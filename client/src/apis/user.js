import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:4000/api/users",
    headers: {
        'Content-Type': 'application/json'
    }
});