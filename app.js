///////////////
// Variables //
var display = $('.display');
var currentInput = '0';
var previousInput = '0';
var operator = '';
var decimal = false;
var operatorButton = false;
var feetInchButton = false;
var numberButton = true;
var fractionButton = false;
var fractionInputValue = 0;
var fractionInputs = {
  current: [0,0],
  previous: [0,0]
};
var fractionInputOne = false;
var i = 0;

const fractionList = [
  // 1/2s
  {Name:/*1/2*/ "1⁄2", Value:0.50},
  // 1/4s
  {Name:/*1/4*/ "1⁄4", Value:.25},
  {Name:/*3/4*/ "3⁄4", Value:0.75},
  // 1/8s
  {Name:/*1/8*/ "1⁄8", Value:0.125},
  {Name:/*3/8*/ "3⁄8", Value:0.375},
  {Name:/*5/8*/ "5⁄8", Value:0.625},
  {Name:/*7/8*/ "7⁄8", Value:0.875},
  //  1/16s
  {Name:/*1/16*/ "1⁄16", Value:0.0625},
  {Name:/*3/16*/ "3⁄16", Value:0.1875},
  {Name:/*5/16*/ "5⁄16", Value:0.3125},
  {Name:/*7/16*/ "7⁄16", Value:0.4375},
  {Name:/*9/16*/ "9⁄16", Value:0.5625},
  {Name:/*11/16*/ "11⁄16", Value:0.6875},
  {Name:/*13/16*/ "13⁄16", Value:0.8125},
  {Name:/*15/16*/ "15⁄16", Value:0.9375},
  //  1/32s
  {Name:/*1/32*/ "", Value:0.0313},
  {Name:/*3/32*/ "", Value:0.0938},
  {Name:/*5/32*/ "", Value:0.1563},
  {Name:/*7/32*/ "", Value:0.2188},
  {Name:/*9/32*/ "", Value:0.2813},
  {Name:/*11/32*/ "", Value:0.3438},
  {Name:/*13/32*/ "", Value:0.4063},
  {Name:/*15/32*/ "", Value:0.4688},
  {Name:/*17/32*/ "", Value:0.5313},
  {Name:/*19/32*/ "", Value:0.5938},
  {Name:/*21/32*/ "", Value:0.6563},
  {Name:/*23/32*/ "", Value:0.7188},
  {Name:/*25/32*/ "", Value:0.7813},
  {Name:/*27/32*/ "", Value:0.8438},
  {Name:/*29/32*/ "", Value:0.9063},
  {Name:/*31/32*/ "", Value:0.9688},
];

///////////////
// Functions //
function  add(x, y) {
  return x+y;
};

function  subtract(x, y) {
  return x-y;
};

function  divide(x, y) {
  return x/y;
};

function  multiply(x, y) {
  return x*y;
};

function operatorClear(x) {
  previousInput = currentInput;
  fractionInputs.previous = fractionInputs.current.slice(0);
  for (i = 0; i < 2; i++) {
    fractionInputs.current[i] = 0;
  }

  // console.log("CHECK",fractionInputs.current[1],fractionInputs.previous[1])
  currentInput = '0';
  // fractionInputValue = 0;
  currentInput = x.text();
  operatorButton = false;
}

// Loops through object array and will return match.
function fractionSearch(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].Value == value) {
      console.log("match:",fractionList[i].Name);
      return array[i].Name;
      break;
    }
  };
}

/////////////
// Buttons //
$('.clearButton').click(function() {
 currentInput = '0';
 display.text(currentInput);
 feetInchButton = false;
 numberButton = true;
 fractionButton = false;
});

$('.numberButton').click(function(){
  if (numberButton == true) {
    if (operatorButton == true) {
      operatorClear($(this));
    }
    else if (currentInput === '0') {
      currentInput = $(this).text();
    }
    else {
      currentInput += $(this).text();
    }
    display.text(currentInput);
  }
});

// Decimal Button //
// Adds decimal point unless already used in currentInput.
$('.decimalButton').click(function() {
  if (operatorButton == true) {
    currentInput = '0';
    // console.log(true);
    currentInput += $(this).text();
    operatorButton = false;
    display.text(currentInput);
  }
  if (currentInput.indexOf('.') == -1 ) {
    currentInput += $(this).text();
    display.text(currentInput);
  }
});

// Operator Buttons //
// Sets operator for execution when equals button is pressed.
$('.operatorButton').click(function() {
  button = $(this).text();
  operatorButton = true;
  operator = button;
  numberButton = true;
  fractionButton = false;
  console.log('operator');
});

// Feet and Inch buttons //
// Sets calculator to feet and inch mode if used in entry
$('.feetInchButton').click(function() {
  if ($(this).hasClass('feetButton')) {
    if ((currentInput.indexOf("'") == -1) && (currentInput.indexOf('"') <= -1)) {
      currentInput += "' ";
      fractionInputs.current[0] = fractionInputValue;
      console.log('Fractional Feet');
      display.text(currentInput);
      numberButton = true;
    }
  };
  if ($(this).hasClass('inchButton')) {
    if (currentInput.indexOf('"') == -1 ) {
      currentInput += '"';
      fractionInputs.current[1] = fractionInputValue;
      console.log('Inches');
      display.text(currentInput);
      numberButton = false;
      console.log("CHECK",fractionInputs.current[1],fractionInputs.previous[1])
    }
  };
  feetInchButton = true;
  fractionButton = false;
});

// Fraction menu buttons
$('.fractionButton').click(function(){
  if (fractionButton == false && numberButton == true) {
    if ($(this).hasClass('quarters')) {
      $('.quarter').addClass('On');
    }
    if ($(this).hasClass('eighths')) {
      $('.eighth').addClass('On');
    }
    if ($(this).hasClass('sixteenths')) {
      $('.sixteenth').addClass('On');
    }
    if ($(this).hasClass('thirtyseconds')) {
      $('.thirtysecond').addClass('On');
    }
    $('.fractionContainer').addClass('fractionContainerDisplay');
  }
});

// Individual fraction buttons
$('.fractions').click(function(){
  if (fractionButton == false) {
    var fractionName = $(this).text();
    //Searches fractionList array and sets fraction value.
    for (var i = 0; i < fractionList.length; i++) {
      if (fractionList[i].Name == fractionName) {
        fractionInputValue = fractionList[i].Value;
        console.log("Set Fraction", fractionInputValue);
        break;
      }
    };
    // console.log(fractionName);
    // Determines how input is added:
    // 1. Clears value if operator has been used.
    // 2. Replaces currentInput if current value is 0
    // 3. Adds to currentInput if value is not 0
    if (operatorButton == true) {
      operatorClear($(this));
    }
    else if (currentInput === '0') {
      currentInput = $(this).text();
    }
    else {
      currentInput += " "+$(this).text();
    }

    display.text(currentInput);
    fractionButton = true;
    numberButton = false;
    $('.fractions').removeClass('On');
    $('.fractionContainer').removeClass('fractionContainerDisplay');

    // console.log(fractionButton);
  }
});

// Back out of fraction selection
$('.backButton').click(function() {
  $('.fractions').removeClass('On');
  $('.fractionContainer').removeClass('fractionContainerDisplay');
});

// Equals button //
// The equals button excutes equation selected.
$('.equalButton').click(function() {
  // Coverts fraction string inputs into decimals for caculations.
  if (feetInchButton == true) {
    // Coverts input into feet and inch numbers for current and previous inputs.
    var input = [currentInput, previousInput];
    // X = currentInput | Y = previousInput
    var feet = [feetX = 0, feetY = 0];
    var inch = [inchesX = 0, inchesY = 0];
    var fractionalFeet = [fractionInputs.current[0], fractionInputs.previous[0]];
    var fractionalInches = [fractionInputs.current[1], fractionInputs.previous[1]];
    // console.log(fractionalInches[0],"|",fractionalInches[1]);
    // console.log(inch[0], inch[1]);
    // checks for inputs without feet or inch marks and adds inch mark to input without designation.
    for (i = 0; i < 2; i++) {
      if ( (input[i].indexOf("'") == -1) && (input[i].indexOf('"') == -1) ) {
        input[i] = input[i]+'"';
      }
    }
    // console.log(fractionInputValue);
    // console.log(inch[0], inch[1]);
    // console.log(fractionalInches[0], fractionalInches[1]);    
    console.log(input[0],"|", input[1]);
  

    //Vulgar fraction value adjustment//
    // If statement clause does not return same results if feet are entered and does not add the valueToRemove
    // that needs to be subtracted due to the numerator of the vulgar fractions getting added to the total value.
    for (i = 0; i < 2; i++) {
      var fractionName = fractionSearch(fractionList, fractionalInches[i]) || 0;
      var valueToRemove = parseFloat(fractionName) || 0;
      console.log("Fraction Name", fractionName);
      console.log("Value to Remove",valueToRemove);
      feet[i] = parseFloat(input[i].substr(0, input[i].indexOf("'"))) || 0;
      inch[i] = parseFloat(input[i].substr(input[i].indexOf("'")+1, input[i].indexOf('"'))) || 0;
    }

///////////////////////////////////////
    // Issue with for loop that causing inch value to be set to zero regardless if vulgar fraction is being used.
    
    // TEST //
    // This method seems to work better. Need to find a reliable way to remove vulgar fractions from string. 
    // Seems to be another error with the fractionalInches variable not being reset to null when only one vulgar fraction is used.

    // for (i = 0; i < 2; i++) {
    //   var fractionName = fractionSearch(fractionList, fractionalInches[i]) || 0;
    //   var valueToRemove = parseFloat(fractionName) || 0;

    //   console.log("Fraction Name", fractionName);
    //   console.log("Value to Remove",valueToRemove);
    //   // feet[i] = parseFloat(input[i].substr(0, input[i].indexOf("'"))) || 0;
    //   // inch[i] = parseFloat(input[i].substr(input[i].indexOf("'")+1, input[i].indexOf('"')))-valueToRemove || 0;
    //   feet[i] = (input[i].substr(0, input[i].indexOf("'"))) || 0;
    //   inch[i] = (input[i].substr(input[i].indexOf("'")+1, input[i].indexOf('"'))) || 0;

    //   if ( fractionName != 0) {
    //     console.log([i],"FOUND!!!");
    //     inch[i].replace(fractionName, " ");
    //   }
      
    // }
/////////////////////////////////////////
    console.log(inch[0],"|", inch[1]);
    console.log("CHECK", fractionInputs.current[1],fractionInputs.previous[1])
    // Input conversion for calcualtions
    // Compiles each input into total decimal feet.
    for (i = 0; i < 2; i++) {
      input[i] = ( (feet[i] + fractionalFeet[i]) + ( (inch[i] + fractionalInches[i])/12) );
    }

    // Perform operation
    if (operator === '+') {
      totalDecimalFeet = add(input[1], input[0]);
    }
    else if (operator === '-') {
      totalDecimalFeet = subtract(input[1], input[0]);
    }
    else if (operator === '÷') {
      totalDecimalFeet = divide(input[1], input[0]);
    }
    else if (operator === '*') {
      totalDecimalFeet = multiply(input[1], input[0]);
    }

    // Converts back to feet and inches after operation.
    var feet = Math.floor(totalDecimalFeet);
    var inches = (totalDecimalFeet - feet)*12;
    var wholeInches = Math.floor(inches);
    var fractionalInches = (inches.toFixed(4) - wholeInches);
    var answer = (feet+"' "+wholeInches);
    // console.log(feet+" | "+inches);
    // console.log(wholeInches+'"', "|",fractionalInches+'"');

    console.log("Answer",totalDecimalFeet*12);


    // Searches fractionList for match and returns name for display.

    // fractionSearch(fractionList, fractionalInches[i]);

    for (var i = 0; i < fractionList.length; i++) {
      if (fractionList[i].Value == fractionalInches) {
        fractionalInches = fractionList[i].Name;
        // console.log(fractionList[i].Name);
        break;
      }
    };

    // Displays answer as currentInput and resets boolean triggers for new input.
    currentInput = answer + " " + fractionalInches+'"';
    display.text(currentInput);
    numberButton = true;
    operatorButton = true;
    fractionButton = false;
    // console.log(previousInput);
  }

  // Executes operations for non Feet and inch inputs.
  else {
    var x = parseFloat(previousInput);
    var y = parseFloat(currentInput);
    if (operator === '+') {
      currentInput = add(x, y);
    }
    else if (operator === '-') {
      currentInput = subtract(x, y);
    }
    else if (operator === '÷') {
      currentInput = divide(x, y);
    }
    else if (operator === '*') {
      currentInput = multiply(x, y);
    }
    // console.log(x, y);
    operatorButton = true;
    fractionButton = false;
    display.text(currentInput);
    previousInput = currentInput;
  }
});
