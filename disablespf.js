/* Google Chrome Extension */

var newScript = document.createElement("script");
newScript.type = "text/javascript";
newScript.innerText = "ytspf.enabled = false; ytspf.config['navigate-limit'] = 0;_spf_state.config['navigate-limit'] = 0;";
document.body.appendChild(newScript);

setTimeout(function() {
	var checkBox = document.getElementById("autoplay-checkbox");
	if (checkBox && checkBox.checked == true) {
		checkBox.click();
	}
}, 3000);

setTimeout(function() {
	var checkBox = document.getElementById("autoplay-checkbox");
	if (checkBox && checkBox.checked == true) {
		checkBox.click();
	}
}, 15000);

