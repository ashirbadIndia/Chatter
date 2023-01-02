import axios from 'axios';

export default axios.create({
    baseURL: "/api/contacts",
    headers: {
        'Content-Type': 'application/json'
    }
});