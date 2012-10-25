var buttons = document.getElementsByTagName('button');
buttons[0].onclick=alert("clicked 0");

function display() {
	alert("clicked");
}

for(button in buttons){
	button.onclick = display;
}



