const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.calc_keys')
const display = document.querySelector('.calc_display')

keys.addEventListener('click', e => {
  if (e.target.matches('button')){
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const showNum = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType
    
    //replace 0 with clicked key
    if(!action) {
      if(showNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent
      } else {
        display.textContent = showNum + keyContent
      }
    }

    if(
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide' 
    ) {
      key.classList.add('is-pressed')
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.firstVal = showNum
      calculator.dataset.operator = action
    }

    if (action === 'clear') {
      console.log('clear key!')
    }

    if (action === 'operate') {
      const secondVal = showNum
    }

    if (action === 'decimal'){
      display.textContent = showNum + '.'
    }
  }
})


// function add (x,y) {
//   return x + y;
// };
// // console.log(add(1,2));

// function subtract(x,y) {
//   return x - y
// };
// // console.log(subtract(10,5));

// function multiply (x,y) {
//   return x * y
// };
// // console.log(multiply(10,10));

// function divide (x,y) {
//   return x / y
// };
// // console.log(divide(20,10));



function operate(x, operator, y) {
  let result = ''

  if (operator === 'add') {
    result = parseFloat(x) + parseFloat(y)
  } else if (operator === 'subtract') {
    result = parseFloat(x) - parseFloat(y)
  } else if (operator === 'multiply') {
    result = parseFloat(x) * parseFloat(y)
  } else if (operator === 'divide') {
    result = parseFloat(x) / parseFloat(y)
  }
   return result
}