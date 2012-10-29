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

	isOperator = function(input) {
		return input == '+' || input == '-' ||input == '*' 
						||input == '/' || input == '=' ;
	},

	memoryOperator = function (mOperator) {
		return mOperator == 'MR' || mOperator == 'M+' || mOperator == 'M-';
	},

	mExecute = function(mOperator) {
		if(mOperator == 'M+'){
			memory += parseFloat(textbox.value);
		}
		else if(mOperator == 'M-'){
		 	memory -= parseFloat(textbox.value);
		}
		else {
			textbox.value = parseFloat(memory);
		}
	},

	calculate = function () {

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
			memory = 0;
			resetData();
		}
		if(memoryOperator(this.value)){
			mExecute(this.value);	
			return;	
		}

	};

	var init = function(){
		for(var i=0; i<buttons.length; i++) {
			buttons[i].onclick = calculate;
		}
	};
	return init();
};

document.onload = calculator();