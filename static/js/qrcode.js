const video   = document.getElementById('scanner');
const button  = document.getElementById('scanQR');
const display = document.getElementById('display');

const result = (link) => {
	console.log(link);
	window.location.replace(link);
}

button.onclick = () => {
	console.log('scanQR:');
	const videoConstraints = {
		facingMode:'environment'
	};

	const constraints = {
		video: videoConstraints,
		audio: false
	};

	navigator.mediaDevices
		.getUserMedia(constraints)
		.then(stream => {
			video.style.display = '';
			video.srcObject = stream;
			EPPZScrollTo.scrollVerticalToElementById('scanner', 0);

			//Using instascan now - very nice
			const scanner = new Instascan.Scanner({ 'video': video, 'mirror': false });
			scanner.addListener('scan', (content) => {
				console.log(content);
			});
			Instascan.Camera.getCameras().then((cameras) => {
				cameras.length > 0 ? scanner.start(cameras[0]) : console.error('No cameras found.');
			}).catch((e) => {
				console.error(e);
			});
			
			//Old scanner - very shite
			//const scanner = new QrScanner(video, link => result(link), 720);
			//scanner.start();
		})
		.catch(error => {
			console.error(error);
		});
}
