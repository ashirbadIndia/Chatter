import axios from 'axios';

export default axios.create({
    baseURL: "/api/users",
    headers: {
        'Content-Type': 'application/json'
    }
});