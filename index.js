let net;

async function predictClick() {
	var predictButton = document.getElementById('predictButton');
	var processingText = '<div class="spinner-border spinner-border-sm" role="status"></div> Processing...';
	if (predictButton.innerHTML !== processingText) {
		predictButton.innerHTML = processingText;
	}
	var uploadedImage = document.getElementById('uploadedImage');
	var prediction = await predict(uploadedImage);
	document.getElementById('result').innerHTML = 'Result: ' + prediction;
	predictButton.innerHTML = 'Predict';
}

async function predict(image) {
	net = await mobilenet.load();
	var result = await net.classify(image);
	return result[0].className;
}

async function loadImage(event) {
	var reader = new FileReader();
	reader.onload = function () {
		var img = document.getElementById('uploadedImage');
		img.src = reader.result;
	};
	reader.readAsDataURL(event.files[0]);
}
