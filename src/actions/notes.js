import {db} from '../firebase/firebase-config'
import { loadNotes } from '../helpers/loadNotes'
import { types } from '../types/types'

import Swal from 'sweetalert2'
import { fileUpload } from '../helpers/fileUpload'

// react-journal
export const startNewNote = () => {
	// Como es func asyncrono, usamos un callback
	// El 2° argumetno es un func para obtener el state
	return async (dispatch, getState) => {
		const {uid} = getState().auth

		// Pad que mandaremos a firebase
		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
		}
		try {
			// De firebase-config
			// `` Viene de la estructura que definimos en firebase
			// Como es una promesa, 'async' al return de la func
			const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
			dispatch(activeNote(doc.id, newNote))
			dispatch(addNewNote(doc.id, newNote))
		} catch (error) {
			console.log(error);
		}
	}
}

// () porque retorna un objeto
export const activeNote = (id, note) => ({
	type: types.notesActive,
	payload: {
		id,
		// ... toda la infromación en el mismo objeto
		...note
	}
})

export const addNewNote = (id, note) => ({
	type: types.notesAddNew,
	payload: {
		id,
		...note
	}
})

export const startLoadingNotes = (uid) => {
	return async (dispatch) => {

		const notes = await loadNotes(uid)
		dispatch(setNotes(notes))
	}
}

export const setNotes = (notes) => ({
	type: types.notesLoad,
	payload: notes
})

// La nota ya viene con su id
export const startSaveNote = (note) => {
	return async (dispatch, getState) => {
		const {uid} = getState().auth

		// La url se manda como undefined, por lo tanto validamos
		// Si no esta, borrar undefined antes de la extraccion ...
		if (!note.url) {
			delete note.url
		}
		// Expret ... para separar toda la nota | se crea copia
		const noteToFirestore = {...note}
		delete noteToFirestore.id

		await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)

	// Puede ser note | noteToFirestore
		dispatch(refreshNote(note.id, note))
		Swal.fire('Saved', note.title, 'success')
	}
}

// Actualiza unicamente la nota que cambie, para las tarjetas del sidebar
export const refreshNote = (id, note) => ({
	type: types.notesUpdated,
	payload: {
		id,
		// Garantizar el key que tenga el id en el componente
		note: {
			id,
			...note
		}
	}
})

// Subir archivos
export const startUploading = (file) => {
	// getState para saber la nota actual
	return async (dispatch, getState) => {
		Swal.fire({
			title: 'Cargando...',
			text: 'Espere por favor',
			allowOutsideClick: false,
			onBeforeOpen: () => {
				Swal.showLoading()
			}
		})

		const {active: activeNote} = getState().notes
		const fileUrl = await fileUpload(file)

		// Actualizar URL
		activeNote.url = fileUrl
		// console.log(fileUrl);
		dispatch(startSaveNote(activeNote))

		// Despues del await
		Swal.close()
	}
}

// Borrar notas de firebase
export const startDeleting = (id) => {
	return async (dispatch, getState) => {

		const uid = getState().auth.uid
		await db.doc(`${uid}/journal/notes/${id}`).delete()

		// Borrado del store
		dispatch(deleteNote(id))

	}
}

// Borrar nota del store(state)
export const deleteNote = (id) => ({
	type: types.notesDelete,
	payload: id
})

// Borrar todas las notas del store(state) al hacer Logout
export const noteLogout = () => ({
	type: types.notesLogoutCleaning,
})