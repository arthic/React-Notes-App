import Swal from 'sweetalert2'

import {googleAuthProvider} from '../firebase/firebase-config'
import firebase from '../firebase/firebase-config'
import { types } from "../types/types"
import { noteLogout } from './notes'
import { finishLoading, startLoading } from './ui'

export const startLoginEmailPassword = (email, password) => {
	/* Prueba de funcion asincrona (Fetch, posteo de archivos,
	dispatch de otras acciones ) */
	return(dispatch) => {

		dispatch(startLoading())

		// Agregamos return para evaluar en el testing
		return firebase.auth().signInWithEmailAndPassword(email, password)
			// No necesariamente async
			.then(({user}) => {
				dispatch(login(user.uid, user.displayName))

				dispatch(finishLoading())
			})
			.catch(e => {
				console.log(e);
				dispatch(finishLoading())
				// Swal.fire('Error', e.message, 'error')
				Swal.fire('Error', 'Uno de los campos es incorrecto' , 'error')
			})
		/* setTimeout(() => {
			dispatch( login(123, 'Soto'))
		}, 3500); */
	}
}

// Asincrono
export const startRegisterWithEmailPasswordName = (email, password, name) => {
	return (dispatch) => {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then( async({user}) => {
				// console.log(user);
				// Insertamos el nombre que recibimos al inicio de la func
				await user.updateProfile({displayName: name})

				dispatch(
					login(user.uid, user.displayName)
				)
			})
			.catch(e => {
				// Swal.fire('Error', e.message, 'error')
				Swal.fire('Error', e.message, 'error')
				console.log(e);
			})
	}
}

export const startGoogleLogin = () => {
	return (dispatch) => {
		firebase.auth().signInWithPopup(googleAuthProvider)
		// Desestructuramos la respuesta del login con google "user"
			.then(({user}) => {
				dispatch(
					login(user.uid, user.displayName)
				)
			})
	}
}

export const login = (uid, displayName) => ({
	type: types.login,
	payload: {
		uid,
		displayName
	}
})

// Asincrono
export const startLogout = () => {
	return async (dispatch) => {
		await firebase.auth().signOut()

		/*Mandamos la accion logout que viene en definida abajo
		la cual manda el despacho al state, en el cual el authREducer
		se encarga de recetear los valores de la autenticación */
		dispatch(logout())
		dispatch(noteLogout())
	}
}

export const logout = () => ({
	type: types.logout
})