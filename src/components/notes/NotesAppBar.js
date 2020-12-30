import React from 'react'
import moment from 'moment'
import 'moment/locale/es';
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'
moment.locale('es');

export const NotesAppBar = () => {

	const dispatch = useDispatch()

	// Extraemos del estate la nota activa
	const {active} = useSelector(state => state.notes)

	const activeDate = moment(active.date)


	const handleSave = () => {
		dispatch(startSaveNote(active))
	}

	const handlePictureClick = () => {
		document.querySelector('#fileSelector').click()
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0]
		if (file) {
			dispatch(startUploading(file))
		}
	}

	return (
		<div className="notes__appbar">
			<span>
				<i className="far fa-calendar-alt"></i>
				&nbsp;&nbsp;{activeDate.format('L')}
				&nbsp;&nbsp;
				<i className="fas fa-clock"></i>
				&nbsp;&nbsp;{activeDate.format('LT')}
			</span>
			<input
				type="file"
				id="fileSelector"
				name="file"
				style={{display: "none"}}
				onChange={handleFileChange}
			/>

			<div className="notes__appbar-icons">
				<i
					className="far fa-image"
					onClick={handlePictureClick}
					></i>
				<i
					className="fas fa-save"
					onClick={handleSave}
				></i>
			</div>
		</div>
	)
}
