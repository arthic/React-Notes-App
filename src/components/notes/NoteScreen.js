import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'

import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

	const dispatch = useDispatch()

	const {active: note} = useSelector(state => state.notes)
	// Custom
	const [formValues, handleInputChange, reset] = useForm(note)
	const {body, title, id} = formValues

	// Hook-React alamcena una var mutable que no redibuja todo el componente
	const activeId = useRef(note.id)

	// Manejar vista de la nota
	useEffect(() => {
		// Si es diferente de
		if(note.id !== activeId.current){
			reset(note)
			activeId.current = note.id
		}
	}, [note, reset])

	// Actualizar valores en el state
	useEffect(() => {
		dispatch(activeNote(formValues.id, {...formValues}))

	}, [formValues, dispatch])

	const handleDelete = () => {
		dispatch(startDeleting(id))
	}

	return (
		<div className="notes__main-content">

			<NotesAppBar/>

			<div className="notes__content">
				<input
					type="text"
					placeholder="Que paso hoy?"
					className="notes__title-input"
					autoComplete="off"
					name="title"
					value={title}
					onChange={handleInputChange}
				/>
				<textarea
					placeholder="..."
					className="notes__textarea"
					name="body"
					value={body}
					onChange={handleInputChange}
				></textarea>
				{
					(note.url)
					&& (
						<div className="notes__image">
							<img
							src={note.url}
							alt="imagen"
							/>
						</div>
					)
				}
			</div>

			<button
				className="btn btn-danger"
				onClick={handleDelete}
			>Borrar <i className="fas fa-trash"></i>
			</button>

		</div>
	)
}
