const fetchPost = async (url, body) => {
	console.log('fetchPost');
	const response = await fetch(url, {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
	return await response.json(); // parses JSON response into native JavaScript objects
}

const fetchGet = async (url) => {
	console.log('fetchGet');
	const response = await fetch(url, {
		method: "GET",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	});
	return await response.json(); // parses JSON response into native JavaScript objects
}