import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { startNewNote } from '../../actions/notes'
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

	// React-Redux
	const dispatch = useDispatch()

	// Viene del authReducer
	const {name} = useSelector( state => state.auth)

	const handleLogout = () => {
		dispatch(startLogout())
	}
	const handleAddNew = () => {
		dispatch(startNewNote())
	}
	return (
		<aside className="journal__sidebar">
			<div className="journal__sidebar-navbar">
				<h3 className="mt-5">
				<i className="fas fa-user"></i>
					<span>&nbsp;&nbsp;{name}</span>
				</h3>
				<i
					className="fas fa-sign-out-alt"
					onClick={handleLogout}
				></i>
			</div>

			<div
				className="journal__new-entry"
				onClick={handleAddNew}
			>
				{/* <i className="far fa-calendar-plus fa-5x"></i> */}
				<i className="fas fa-sticky-note fa-5x"></i>
				<p className="mt-5">
					Crear Nota
				</p>
			</div>

			<JournalEntries />
		</aside>
	)
}
