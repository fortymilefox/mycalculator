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
      if(showNum === '0' || previousKeyType === 'operator') {
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
  
      if (firstVal && 
          operator &&
          previousKeyType !== 'operator'
        ) {
        display.textContent = operate(firstVal, operator, secondVal)  
      }
      key.classList.add('is-pressed')
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.firstVal = showNum
      calculator.dataset.operator = action
    
    }

    if (action === 'clear') {
      console.log('clear key!')
      calculator.dataset.previousKeyType = 'clear'
    }

    if (action === 'operate') {
      const firstVal = calculator.dataset.firstVal
      const operator = calculator.dataset.operator
      const secondVal = showNum

      display.textContent = operate(firstVal, operator, secondVal)
    }

    if (action === 'decimal'){
      if (!showNum.includes('.')){
        display.textContent = showNum + '.'
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


