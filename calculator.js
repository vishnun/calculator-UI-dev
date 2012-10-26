var buttons = document.getElementsByTagName('button');
var dataStack =[];
var textbox = document.getElementById('text');
var clearField = false;
var DECIMAL = '.';

var push = function(value, operator) {
	dataStack.push(value);
	dataStack.push(operator);
}

var display = function(data) {
	if(data > parseInt(data)) {
		data = data.toFixed(2);
	}
	if(data.toString().length > 10)
		data = data.toExponential(5);
	textbox.value = data;
}

var isInvalid = function(oldOp, operand2) {
	if(oldOp == '/' && operand2 == 0)
		return true;
	return false;
}

var execute = function(operator) {
	clearField = true;
	if(dataStack.length > 0) {
		var oldOp = dataStack.pop();
		var operand1 = parseFloat(dataStack.pop());
		var operand2 = parseFloat(textbox.value);
		if(isInvalid(oldOp, operand2)) {
			textbox.value = "E";
			return;
		}
		console.log("text: " +textbox.value);
		console.log(operand1 + " " + operand2);
		var result = operation(operand1, oldOp, operand2);
		display(result);
		if(operator!= '='){			
			push(result, operator);
		}		
		return;
	}
	if(operator == '=')
		return;
	if(textbox.value == "")
		textbox.value = "0";
	push(textbox.value, operator);
}

var operation = function(operand1, oldOp, operand2) {
	switch(oldOp) {
		case "+": return operand1 + operand2;
		case "-": return operand1 - operand2;
		case "*": return operand1 * operand2;
		case "/": return operand1 / operand2;
	}
}

var isOperator = function(input) {
	if(input == '+' || input == '-' ||input == '*' 
					||input == '/' || input == '=') {
		return true;
	}
	return false;
}

var calculate = function () {
	if(isOperator(this.value)) {
		execute(this.value);	
		return;
	}
	if(clearField) {
		textbox.value = "";
		clearField = false;
	}
	if(!isNaN(this.value)) {
		if(textbox.value.length == 10)
			return;
		textbox.value += this.value;
		return;
	}
	if(this.value == DECIMAL) {
		if(textbox.value == "") {
			textbox.value = "0";
		}
		textbox.value += this.value;
	}
	if(this.value == "C") {
		textbox.value = "";
		dataStack = [];
	}

}

for(var i=0; i<buttons.length; i++) {
	buttons[i].onclick = calculate;
}