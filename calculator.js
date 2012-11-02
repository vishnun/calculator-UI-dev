var calculator = function () {

	var data = {
		value: 0,
		textbox: document.getElementById('text'),
		length: 0,
		displayErrorMessage: function(message){
			this.textbox.value = message;
			this.value = 0;
		},
		store: function(inputValue){
			this.value = parseFloat(inputValue);
			if(this.value > parseInt(data)) {
				this.value = this.value.toFixed(2);
			}
			if(this.value.toString().length > 10) {
				this.value = this.value.toExponential(2);
			}
			this.textbox.value = this.value;
		},
		retrieve: function(){
			this.value = parseFloat(this.textbox.value);
			this.length = this.value.toString().length;
			return this.value;
		}
	};

	var buttons = document.getElementsByTagName('button'),
		clearField = false,
		DECIMAL = '.',
		memory = 0,
		oldOp = null,
		oldValue = 0,
		newValue = 0,
		buttonNames = ['MR', 'MC', 'M-'],


	push = function(value, operator) {
		oldOp = operator;
		oldValue = parseFloat(value);
	},

	resetData = function(){
		oldOp = null;
		oldValue = 0;
	},

	isInvalid = function(oldOp, operand2) {
		if(oldOp == '/' && operand2 == 0)
			return true;
		return false;
	},

	execute = function(operator) {
		clearField = true;
		
		if(oldOp != null && oldValue != 0) {
			newValue = data.retrieve();

			if(isInvalid(oldOp, newValue)) {
				data.displayErrorMessage("E");
				return;
			}
			var result = operation(oldValue, oldOp, newValue);
			resetData();
			data.store(result);
			if(operator!= '='){			
				push(result, operator);
			}		
			return;
		}

		if(operator == '='){
			return;
		}

		if(data.retrieve() == "")
			data.store("0");
		push(data.retrieve(), operator);
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
		return mOperator == 'MR' || mOperator == 'M+' || mOperator == 'M-' || mOperator == 'MC';
	},

	createMemoryButtons = function(){
		while(buttonNames.length >0 ) {
			var memoryButton= document.createElement('button');
			var name = buttonNames.pop();
			memoryButton.setAttribute('value', name);
			memoryButton.setAttribute('name', 'removable');
			memoryButton.innerHTML = name;
			var memoryOperations = document.getElementById('memory-operations');
			memoryOperations.appendChild(memoryButton);
			memoryButton.onclick = function(){
				calculate(this.value);
			};
		}
	},

	clearMemory = function(){
		var memIndicator = document.getElementById("memory-indicator");
			memIndicator.style.display = "none";
			memory = 0;
	},

	removeMemoryButtons = function() {
		var removableButtons = document.getElementsByName("removable");
		var parent = document.getElementById('memory-operations');
		while(removableButtons.length){
			parent.removeChild(removableButtons[0]);	
		} 
		buttonNames = ['MR', 'MC', 'M-'];
	},

	memoryExecute = function(mOperator) {
		switch(mOperator){
			case 'M+':
				createMemoryButtons();
				memory += data.retrieve();
				var memIndicator = document.getElementById("memory-indicator");
				memIndicator.style.display = "block";
				break;
			case 'M-':
			 	memory -= data.retrieve();
				break;
			case 'MC':
				clearMemory();
				removeMemoryButtons();
				break;
			default:
				data.store(memory);
		}
	},

	isOperator = function(value){
		if(value == DECIMAL)
			return false;
		return new RegExp(/[*+-\/=]/).test(value);
	},


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
			data.store("0");
			clearField = false;
		}
		if(!isNaN(value)) {
			data.retrieve();
			if(data.length >= 10)
				return;
			data.store(data.retrieve() + value + "");
			return;
		}
		if(value == DECIMAL) {
			if(data.retrieve().indexOf(".") == -1)
				data.store(data.retrieve() + value + "");
			return;
		}
		if(value == "C") {
			data.store("0");
			resetData();
		}	
		return;

	};

	var init = function(){
		data.store("0");
		for(var i=0; i<buttons.length; i++) {
			buttons[i].onclick = function(event){
				calculate(this.value);
			}
		}
		document.body.onkeypress = function(event){
			calculate(String.fromCharCode(event.charCode));
		}
	};
	return init();
};

document.onload = calculator();