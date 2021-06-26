//OPERATE FUNCTION
const operate = (x, operator, y) => {
  const firstNum = parseFloat(x)
  const secondNum = parseFloat(y)
  if (operator === 'add') return firstNum + secondNum
  if (operator === 'subtract') return firstNum - secondNum
  if (operator === 'multiply') return firstNum * secondNum
  if (operator === 'divide') return firstNum / secondNum
}


//CALC STATE
const updateCalcState = (key, calculator,calculatedValue,showNum) => {
  //req variables and properties
  //1. key
  //2. calculator
  //3. calculatedValue
  //4. showNum
  const keyType = getKeyType(key)
  const {
    firstVal,
    operator,
    modValue,
    previousKeyType
  } = calculator.dataset
  
  calculator.dataset.previousKeyType = keyType
  
  //NUMBER
  //if(keyType === 'number') {/* ... */}
  //DECIMAL
  //if(keyType === 'decimal') {/* ... */}
  //OPERATOR
  if(keyType === 'operator') {
    calculator.dataset.operator = key.dataset.action
    calculator.dataset.firstVal = firstVal &&
    operator &&
    previousKeyType !== 'operator' &&
    previousKeyType !== 'operate'
    ? calculatedValue
    : showNum
  }
  //CLEAR
  if(keyType === 'clear' && key.textContent === 'AC') {
    calculator.dataset.firstVal = ''
    calculator.dataset.modValue = ''
    calculator.dataset.operator = ''
    calculator.dataset.previousKeyType = ''
  }  
  
  //OPERATE
  if(keyType === 'operate') {
    calculator.dataset.modValue = firstVal && previousKeyType === 'operate'
    ? modValue
    : showNum
  }
}

const updateVisualState = (key,calculator) => {
  const keyType = getKeyType(key)
  Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-pressed'))
  
  if(keyType === 'operator') key.classList.add('is-pressed')
  if(keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC'
  if(keyType !== 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]')
    clearButton.textContent = 'CE'
  }
}

const getKeyType = key => {
  const {action} = key.dataset
  if(!action) return 'number'
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
    ) return 'operator'
    return action
  }
  //RESULT STRING
  const createResultString = (key, showNum, state) => {
    const keyContent = key.textContent
    const keyType = getKeyType(key)
    const action = key.dataset.action
    const firstVal = state.firstVal
    const modValue = state.modValue
    const operator = state.operator
    const previousKeyType = state.previousKeyType
    // req variables:
    //1. keyContent
    //2. showNum
    //3. previousKeyType
    //4. action
    //5. calculator.dataset.firstVal
    //6. calculator.dataset.operator
    //7. calculator.dataset.modValue
    
    if (keyType === 'number') {
      return showNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate'
      ? keyContent
      : showNum + keyContent
    }
    if (keyType === 'decimal') {
      if (!showNum.includes('.')) return showNum + '.'
      if (previousKeyType === 'operator' || previousKeyType === 'operate') return '0.'
      return showNum
    }
    
    if (keyType === 'operator') {
      return firstVal &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'operate'
      ? operate(firstVal, operator, showNum)
      : showNum
    }
    
    if (keyType === 'clear') return 0
    
    if (keyType === 'operate') {
      return firstVal 
      ? previousKeyType === 'operate'
      ? operate(showNum, operator, modValue)
      : operate(firstVal, operator, showNum) 
      :showNum
    }
    
    
    
  }
  
  
  const calculator = document.querySelector('.calculator')
  const keys = document.querySelector('.calc_keys')
  const display = document.querySelector('.calc_display')
  
  
  keys.addEventListener('click', e => {
    if (!e.target.matches('button')) return
    const key = e.target
    const showNum = display.textContent
    const resultString = createResultString(e.target,showNum,calculator.dataset)

    display.textContent = resultString
    updateCalcState(key, calculator, resultString, showNum)
  
})
