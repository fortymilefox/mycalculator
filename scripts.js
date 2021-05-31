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

    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-pressed'))
    
    //replace 0 with clicked key
    if(!action) {
      if(showNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = keyContent
      } else {
        display.textContent = showNum + keyContent
      }
      calculator.dataset.previousKeyType = 'number'
    }

    if(
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide' 
    ) {
      const firstVal = calculator.dataset.firstVal
      const operator = calculator.dataset.operator
      const secondVal = showNum
      
      if(
        firstVal &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
      ){
        const calcVal = operate(firstVal, operator, secondVal)
        display.textContent = calcVal
        calculator.dataset.firstVal = calcVal
      } else {
        calculator.dataset.firstVal = showNum
      }
      
      key.classList.add('is-pressed')
      calculator.dataset.previousKeyType = 'operator'
      // calculator.dataset.firstVal = showNum
      calculator.dataset.operator = action
    
    }

    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]')
      clearButton.textContent = 'CE'
      // calculator.dataset.previousKeyType = 'clear'
    }

    if (action === 'clear') {
      if (key.textContent === 'AC'){
        calculator.dataset.firstVal = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
      } else {
        key.textContent = 'AC'
      }
      display.textContent = 0
      calculator.dataset.previousKeyType = 'clear'
    }

    if (action === 'operate') {
      let firstVal = calculator.dataset.firstVal
      const operator = calculator.dataset.operator
      let secondVal = showNum

      if(firstVal) {
        if (previousKeyType === 'operate') {
          firstVal = showNum
          secondVal = calculator.dataset.modValue
        }
        display.textContent = operate(firstVal, operator, secondVal)
      }
      calculator.dataset.modValue = secondVal
      calculator.dataset.previousKeyType = 'operate'
    }

    if (action === 'decimal'){
      if (!showNum.includes('.')){
        display.textContent = showNum + '.'
      } else if (
        previousKeyType === 'operator' ||
        previousKeyType === 'operate'

      ) {
        display.textContent = '0.'
      }
      
      calculator.dataset.previousKeyType = 'decimal'
    }

  }
})


const operate = (x, operator, y) => {
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


