import PostData from '../../services/PostData';
import {asyncLocalStorage} from '../../services/asyncData';


export const login = (data) => {
	return (dispatch) => {
		dispatch({type: 'USER_LOADING'});

		return PostData('login', data)
		.then((response) => {
			asyncLocalStorage.setItem('response', response);
		})
		.then(() => {
			return asyncLocalStorage.getItem('response');
		})
		.then((response) => {
			dispatch({
				type: 'LOGIN_SUCCESS',
				response: response
			})
		})
		.catch((err) => {
			dispatch({type: 'LOGIN_ERROR', err: err})
		})
	}
}


export const signUp = (data) => {
    console.log("first");
	return (dispatch) => {
		dispatch({type: 'USER_LOADING'});
		return PostData('register', data)
		.then((response) => {
            console.log(response);
			if(response.success){
                console.log("login success");
				return PostData('login', data);
			}
			else{
				return 'Email Already in use';
			}
		})
		.then((response) => {
			asyncLocalStorage.setItem('response', response);
		})
		.then(() => {
			return asyncLocalStorage.getItem('response');
		})
		.then((response) => {
			dispatch({
				type: 'LOGIN_SUCCESS',
				response: response
			})
		})
		.catch((err) => {
			dispatch({type: 'LOGIN_ERROR', err: err})
		})
	}
}