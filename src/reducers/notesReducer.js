import { types } from '../types/types'
/*
	{
		notes: [],
		active: {
			id: 'ADFAFASDFASDFASF',
			title: '',
			baody: '',
			imageUrl: '',
			date: 12345489
		}
	}
*/
// Donde se maneja el active
const initalState = {
	notes: [],
	active: null
}

export const notesReducer = (state = initalState, action) => {

	switch (action.type) {
		case types.notesActive:
			return {
				...state,
				active: {
					...action.payload
				}
			}
			case types.notesAddNew:
				return {
					...state,
					notes: [
						action.payload,
						// Crear copia de las notas
						...state.notes
					]
				}
		case types.notesLoad:
			return {
				...state,
				// Esparcir el arreglo
				notes: [...action.payload]
			}
		case types.notesUpdated:
			return {
				...state,
				// Esparcir el arreglo
				notes: state.notes.map(
					note => note.id === action.payload.id
						? action.payload.note
						: note
				)
			}
		case types.notesDelete:
			return {
				...state,
				active: null,
				// Retornar todas las notas menos la seleccionada
				notes: state.notes.filter(note =>
					note.id !== action.payload
				)
			}
		case types.notesLogoutCleaning:
			return {
				...state,
				active: null,
				notes: []
			}
		default:
			return state
	}
}