import { useState } from "react"

// Recibe el objeto que quiera manejar, input campo, valor etc
export const useForm = (initialState = {}) => {
	const [values, setValues] = useState(initialState)

	/* Cuando se llame el reset, se pueden establecer los valores
	deseados al formulario*/
	const reset = (newFormState = initialState) => {
		setValues(newFormState)
	}

	// Maneja los cambios de valores del input
	const handleInputChange = ({target}) => {
		setValues({
			...values,
			[target.name]: target.value
		})
	}

	// 1° retnornar el estado del formulario
	// 2° retornarn el handleInputChange pra cambiar los valores del formulari
	return [values, handleInputChange, reset]
}