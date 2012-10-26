var buttons = document.getElementsByTagName('button');
var dataStack =[];
var textbox = document.getElementById('text');
var isEqualPressed = false;
var clearField = false;

var display = function(result){
	document.getElementById('text').value = "" + result;
}

var execute = function(operator) {
	clearField = true;
	if(dataStack.length == 0) {
		var operand=parseFloat(textbox.value);
		dataStack.push(operand);
		dataStack.push(operator);
		return;
	}
	var oldOp = dataStack.pop();
	var operand1 = parseFloat(dataStack.pop());
	var operand2 = parseFloat(textbox.value);
	var result = operation(operand1, oldOp, operand2);
	display(result);
	if(operator == "=" ) {
		isEqualPressed = true;	
		return;
	}
	dataStack.push(result);
	dataStack.push(operator);
}

var operation = function(operand1, oldOp, operand2) {
	switch(oldOp){
		case "+":
			return operand1 + operand2;
			break;
		case "-":
			return operand1 - operand2;
			break;
		case "*":
		    return operand1 * operand2;
			break;
		case "/":
			return operand1 / operand2;
			break;
	}
}

var calculate = function () {
	if(!isNaN(this.value)) {
		if(clearField) {
			textbox.value = "";
			clearField = false;
		}
		textbox.value += this.value;
		return;
	}
	execute(this.value);	
}

for(var i=0; i<buttons.length; i++) {
	buttons[i].onclick = calculate;
}
