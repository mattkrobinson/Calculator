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
// FractionInputs [0] = fractional feet && [1] = fractional inches
var fractionInputs = {
  current: [0,0],
  previous: [0,0]
};
var fractionInputOne = false;
var i = 0;
const fractionList = [
  .5,
  // x/4s
  .25, .75,
  // x/8s
  .125, .375, .625, .875,
  // x/16s
  .0625, .1875, .3125, .4375,
  .5625, .6875, .8125, .9375,
  // x/32s
  .0313, .0938, .1563, .2188, .2813, .3438, .4063, .4688,
  .5313, .5938, .6563, .7188, .7813, .8438, .9063, .9688
];
const fractionDisplayList = [
  {Name:/*1/2*/ "%C2%BD", Value:0.50},
  {Name:/*1/4*/ "%C2%BC", Value:.25},
  {Name:/*3/4*/ "%C2%BE", Value:0.75}
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
  currentInput = '0';
  currentInput = x.text();
  operatorButton = false;
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
      console.log('Fractional Inches');
      display.text(currentInput);
      numberButton = false;
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
  // Finds fraction value for calculations in array based on
  // child's index position from parent element which matches array order.
  // Sets index value for 1/2" button
  var fractionName = encodeURI($(this).text());
  var found = false;

  console.log(fractionName);
  console.log($(this).text());

  for (var i = 0; i < fractionDisplayList.length; i++) {
    if (fractionDisplayList[i].Name == fractionName) {
      console.log(fractionDisplayList[i].Value);
      found = true;
      break;
    }
  };
  console.log(found);

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
  fractionButton = true;
  numberButton = false;
  $('.fractions').removeClass('On');
  $('.fractionContainer').removeClass('fractionContainerDisplay');
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


    // checks for inputs without feet or inch marks and adds feet mark to input without designation.
    for (i = 0; i < 2; i++) {
      if ( (input[i].indexOf("'") == -1) && (input[i].indexOf('"') == -1) ) {
        input [i] = input[i]+'"';
      }
    }

    // Converts string into numbers.
    for (i = 0; i < 2; i++) {
      feet[i] = parseFloat(input[i].substr(0, input[i].indexOf("'"))) || 0;
      inch[i] = parseFloat(input[i].substr(input[i].indexOf("'")+1, input[i].indexOf('"'))) || 0;
    }

    // Input conversion for calcualtions
    // Compiles each input into total decimal feet.
    for (i = 0; i < 2; i++) {
      input[i] = ( (feet[i] + fractionalFeet[i]) + ( (inch[i] + fractionalInches[i])/12 ) );
    }
    // console.log('Decimal Current: '+ input[0]);
    // console.log('Decimal Previous: '+ input[1]);
    console.log('Current: '+ currentInput,"X",feet[0]+"'", inch[0]+'"');
    console.log('Previous: '+ previousInput,"Y",feet[1]+"'", inch[1]+'"');
    console.log('CurrentFraction ' + fractionInputs.current[1]);
    console.log('CurrentFraction ' + fractionInputs.current[0]);
    console.log('PreviousFraction ' + fractionInputs.previous[1]);
    console.log('PreviousFraction ' + fractionInputs.previous[0]);

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

    console.log((totalDecimalFeet*12));

    // var totalDecimalFeet = ((((feet[0] + feet[1])+(fractionInputCurrent[0] + fractionInputPrevious[0])) * 12) + ((inch[0] + inch[1]) + (fractionInputCurrent[1] + fractionInputPrevious[1])))/12;
    // Converts back to feet and inches after operation.
    var feet = Math.floor(totalDecimalFeet);
    var inches = (totalDecimalFeet - feet)*12;
    var wholeInches = Math.floor(inches);
    var fractionalInches = (inches - Math.floor(inches));
    var answer = (feet+"' "+inches.toFixed(0)+'"');
    console.log(wholeInches+'"', "|",fractionalInches+'"');

    var found = false;
    for (var i = 0; i < fractionDisplayList.length; i++) {
      if (fractionDisplayList[i].Value == fractionalInches.toFixed(2)) {
        console.log(fractionDisplayList[i].Name);
        found = true;
        break;
      }
    };

    console.log(found);
    console.log(fractionalInches.toFixed(2));


    // Displays answer as currentInput and resets boolean triggers for new input.
    currentInput = answer;
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
