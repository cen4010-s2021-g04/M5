import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const updateUser = userData => dispatch => {
    
    axios
        .put('user/' + userData._id)
};