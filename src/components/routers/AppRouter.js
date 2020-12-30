import React, { useEffect, useState } from 'react'
import {
	BrowserRouter as Router,
	Redirect,
	Switch
} from 'react-router-dom'

import {useDispatch} from 'react-redux'

import firebase from '../../firebase/firebase-config'
import { login } from '../../actions/auth'
import { startLoadingNotes } from '../../actions/notes'

import { AuthRouter } from './AuthRouter'
import { JournalScreen } from '../journal/JournalScreen'

import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

export const AppRouter = () => {

	// React-Redux
	const dispatch = useDispatch()

	// const [checking, setChecking] = useState(true)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	// Mantener el estado de la autenticación al recargar
	// Como la dependencia [] está vacía, solo se ejecuta una vez
	// Pero siempre se ejecuta cada que canbie el estado de la autenticación
	useEffect(() => {
		/*Crea un observable  un tipo de objeto especial que se puede disparar
		mas de una vez (el auth cambia, se autentica se refresca el usuario
		siempre se dispara el observable )*/
		firebase.auth().onAuthStateChanged( async (user) => {

			if(user?.uid) {
				dispatch(login(user.uid, user.displayName))
				setIsLoggedIn(true)

				dispatch(startLoadingNotes(user.uid))
			} else {
				setIsLoggedIn(false)
			}

			/* En el momento que haya respuesta de firebase, se cambia el estado
			a falso */
			// setChecking(false)
		})
		// No va cambiar realmente pero evitamos el warning
	// }, [dispatch,setChecking, setIsLoggedIn])
	}, [dispatch, setIsLoggedIn])

	// Si checking está en true (implicito en el if), mostrar retorna la siguiente
	// if(checking) {
		// Puede ir lo que sea, incluso otro componente
	// 	return(
	// 		<h1>Espere...</h1>
	// 	)
	// }

	return (
		<>
			<Router>
				<div>
					<Switch>
						<PublicRoute
							path="/auth"
							component={AuthRouter}
							isAutenticated={isLoggedIn}
						/>
						<PrivateRoute
							exact
							path="/"
							component={JournalScreen}
							isAutenticated={isLoggedIn}
						/>
						{/* Muy importante */}
						<Redirect to="/auth/login" />
					</Switch>
				</div>
			</Router>
		</>
	)
}
