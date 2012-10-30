var calculator = function () {

	var buttons = document.getElementsByTagName('button'),
		textbox = document.getElementById('text'),
		clearField = false,
		DECIMAL = '.',
		memory = 0,
		oldOp = 0,
		oldValue = 0,
		newValue = 0,


	push = function(value, operator) {
		oldOp = operator;
		oldValue = parseFloat(value);
	},

	resetData = function(){
		oldOp = 0;
		oldValue = 0;
	},

	display = function(data) {
		if(data > parseInt(data)) {
			data = data.toFixed(2);
		}
		if(data.toString().length > 10)
			data = data.toExponential(5);
		textbox.value = data;
	},

	isInvalid = function(oldOp, operand2) {
		if(oldOp == '/' && operand2 == 0)
			return true;
		return false;
	},

	execute = function(operator) {
		clearField = true;
		
		if(oldOp != 0 && oldValue != 0) {
			newValue = parseFloat(textbox.value);

			if(isInvalid(oldOp, newValue)) {
				textbox.value = "E";
				return;
			}
			var result = operation(oldValue, oldOp, newValue);
			resetData();
			display(result);
			if(operator!= '='){			
				push(result, operator);
			}		
			return;
		}

		if(operator == '='){
			return;
		}

		if(textbox.value == "")
			textbox.value = "0";
		push(textbox.value, operator);
	},

	operation = function(operand1, oldOp, operand2) {
		switch(oldOp) {
			case "+": return operand1 + operand2;
			case "-": return operand1 - operand2;
			case "*": return operand1 * operand2;
			case "/": return operand1 / operand2;
		}
	},

	isMemoryOperator = function (mOperator) {
		return mOperator == 'MR' || mOperator == 'M+' || mOperator == 'M-';
	},

	memoryExecute = function(mOperator) {
		if(mOperator == 'M+'){
			memory += parseFloat(textbox.value);
			var memIndicator = document.getElementById("memory-indicator");
			memIndicator.style.display = "block";
		}
		else if(mOperator == 'M-'){
		 	memory -= parseFloat(textbox.value);
		}
		else {
			textbox.value = parseFloat(memory);
		}
	},

	clearMemory = function(){
		var memIndicator = document.getElementById("memory-indicator");
			memIndicator.style.display = "none";
			memory = 0;
	},

	isOperator = function(value){
		if(value == DECIMAL)
			return false;
		return new RegExp(/[*+-\/=]/).test(value);
	}



	calculate = function (value) {

		if(isMemoryOperator(value)){
			memoryExecute(value);	
			return;	
		}
		if(isOperator(value)){
			execute(value);
			return;
		}
		if(clearField) {
			textbox.value = "0";
			clearField = false;
		}
		if(!isNaN(value)) {
			if(textbox.value.length >= 10)
				return;
			if(textbox.value == "0"){
				textbox.value = "";
			}
			textbox.value += value;
			return;
		}
		if(value == DECIMAL) {
			if(textbox.value.indexOf(".") == -1)
				textbox.value += value;
			return;
		}
		if(value == "C") {
			clearMemory();
			textbox.value = "0";
			resetData();
		}	
		return;

	};

	var init = function(){
		textbox.value = "0";
		for(var i=0; i<buttons.length; i++) {
			buttons[i].onclick = function(event){
				console.log(this.value);
				calculate(this.value);
			}
		}
		document.body.onkeypress = function(event){
			calculate(String.fromCharCode(event.charCode));
			console.log(String.fromCharCode(event.charCode));
		}
	};
	return init();
};

document.onload = calculator();