import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7777',
});

const makeReservation = (data) => api.post('/make-reservation', data);

const checkReservation = (data) => api.get('check-reservation?day='+data);

export {makeReservation, checkReservation};

export default api;