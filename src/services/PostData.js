const PostData = (type, userData) => {
	let url = 'https://campaign.fundall.io/api/v1/';
	
	return new Promise((resolve, reject) => {
		console.log("hhhhhhhhhhhk");

		//let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
		if(type === 'login'){
			const { email, password} = userData;
			fetch(url + type, {
				method: 'POST',
				body: JSON.stringify({
					email,
					password
				}),
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json, text-plain, */*",
					"X-Requested-With": "XMLHttpRequest",
					"Authorization": 'Bearer API_TOKEN'
					//"X-CSRF-TOKEN": token
				}
			})
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			})
		}
		if(type === 'register'){
			console.log('register');
			const { email, password, first_name, last_name, confirm_password } = userData;
			fetch(url + type, {
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
					firstname: first_name,
					lastname: last_name,
					password_confirmation: confirm_password,
				}),
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json, text-plain, */*",
					"X-Requested-With": "XMLHttpRequest",
					"Authorization": 'Bearer API_TOKEN'
					//"X-CSRF-TOKEN": token
				}
			})
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			})
		}
	})
}

export default PostData;
