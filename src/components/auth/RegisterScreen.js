import React from 'react'
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
	/*
		{
			name: 'Aaron',
			email: 'aaron.lls.dev@gmail.com',
			password: '12345',
			password2: '12345'
		}

		// useForm

		const handleRegistrer = (e) {
			console.log(name, email,password, password2)
		}

	*/
	// React-Redux
	const dispatch = useDispatch()
	// Dispara un callback que trae el state
	// Del state extraigo el ui
	const {msgError} = useSelector( state => state.ui)

	// console.log(msgError);

	const [formValues, handleInputChange] = useForm({
		name: 'Aaron',
		email: 'aaron.lls.dev@gmail.com',
		password: '123456',
		password2: '123456'
	})

	const {name, email, password, password2} = formValues;

	const handleRegistrer = (e) => {
		e.preventDefault()
		// console.log(name, email,password, password2)
		if(isFormValid()) {
			dispatch(startRegisterWithEmailPasswordName(email, password, name))
			// console.log('Formulario correcto');
		}
	}

	const isFormValid = () => {
		if(name.trim().length === 0 ) {
			dispatch(setError('Name is required'))
			return false

			// src Validator
		} else if (!validator.isEmail(email)) {
			dispatch(setError('Email is not valid'))
			return false
		} else if (password.length < 5) {
			dispatch(setError('La constraseña debe tener mínimo 6 caracteres'))
			return false
		} else if (password !== password2) {
			dispatch(setError('No coinciden las contraseñas'))
			return false
		}
		dispatch(removeError())
		return true
	}

	return (
		<>
			<h3 className="auth__title">Ingresa tus datos</h3>
			<form
				onSubmit={handleRegistrer}
				className="animate__animated animate__fadeIn animate__faster"
			>
				{
					msgError &&
					(
						<div className="auth__alert-error">
							{msgError}
						</div>
					)
				}
				<input
					type="text"
					placeholder="Name"
					name="name"
					className="auth__input"
					autoComplete="off"
					value={name}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					placeholder="Email"
					name="email"
					className="auth__input"
					autoComplete="off"
					value={email}
					onChange={handleInputChange}
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
					className="auth__input"
					autoComplete="off"
					value={password}
					onChange={handleInputChange}
				/>
				<input
					type="password"
					placeholder="Confirm password"
					name="password2"
					className="auth__input"
					autoComplete="off"
					value={password2}
					onChange={handleInputChange}
				/>
				<button
					type="submit"
					className="btn btn-primary btn-block mb-5"
				>
					Registrar
				</button>

				<Link
					to="/auth/login"
					className="link"
				>
					Ya tienes una cuenta?
				</Link>
			</form>
		</>
	)
}
