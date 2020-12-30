export const fileUpload = async (file) => {

	const cloudUrl = 'https://api.cloudinary.com/v1_1/dyiw5vcuq/upload'
	const formData = new FormData()

	// Ref Postman | Valores que apunta
	formData.append('upload_preset', 'react-journal')
	formData.append('file', file)

	try {
		const resp = await fetch(cloudUrl, {
			method: 'POST',
			body: formData
		})
		if (resp.ok) {
			const cloudResp = await resp.json()
			// URL don esta nuestra img
			return cloudResp.secure_url
		} else {
			// throw await resp.json()
			return null
		}
	} catch (err) {
		console.log(err);
		throw err
	}
}