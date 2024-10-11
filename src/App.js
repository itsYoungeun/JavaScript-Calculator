import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState([]);

  const handleNumber = (event) => {
    const number = event.target.textContent;

    if (history.length > 0) {
        const lastChar = display.trim().slice(-1);

        if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
            setDisplay(display + number);
        } else {
            setHistory([]);
            setDisplay(number);
        }
    } else if (display === '0') {
        setDisplay(number);
    } else {
        setDisplay(display + number);
    }
};

  const handleOperator = (event) => {
    const operator = event.target.textContent;
  
    if (display.endsWith('=')) {
      const result = display.slice(0, -1).trim();
      setDisplay(result + ' ' + operator + ' ');
    } else if (!display.endsWith(' ') && !display.endsWith('+') && !display.endsWith('-') && !display.endsWith('*') && !display.endsWith('/')) {
      setDisplay(display + ' ' + operator + ' ');
    }
  };

  const handleEqual = () => {
    try {
        const parts = display.trim().split(' ');

        if (parts.length < 3) {
            setDisplay("Error");
            return;
        }

        const num1 = parseFloat(parts[parts.length - 3]);
        const operator = parts[parts.length - 2];
        const num2 = parseFloat(parts[parts.length - 1]);

        let result;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 !== 0) {
                    result = num1 / num2;
                } else {
                    setDisplay("Error");
                    return;
                }
                break;
            default:
                setDisplay("Error");
                return;
        }

        setHistory([`${num1} ${operator} ${num2} = ${result}`]);
        setDisplay(result.toString());
    } catch (error) {
        setDisplay("Error");
    }
};

  const handleDecimal = () => {
    const array = display.split(' ');
    const lastElement = array[array.length - 1];

    if (!lastElement.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setHistory([]);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="history">
          {history.map((entry, index) => (
            <div key={index}>{entry}</div>
          ))}
        </div>
        <div id="display" className="row">{display}</div>
        <div id="clear" className="row" onClick={handleClear}>
          AC
        </div>
        <div id="divide" onClick={handleOperator}>/</div>
        <div id="multiply" onClick={handleOperator}>*</div>
        <div id="seven" onClick={handleNumber}>7</div>
        <div id="eight" onClick={handleNumber}>8</div>
        <div id="nine" onClick={handleNumber}>9</div>
        <div id="subtract" onClick={handleOperator}>-</div>
        <div id="four" onClick={handleNumber}>4</div>
        <div id="five" onClick={handleNumber}>5</div>
        <div id="six" onClick={handleNumber}>6</div>
        <div id="add" onClick={handleOperator}>+</div>
        <div id="one" onClick={handleNumber}>1</div>
        <div id="two" onClick={handleNumber}>2</div>
        <div id="three" onClick={handleNumber}>3</div>
        <div id="equals" onClick={handleEqual}>=</div>
        <div id="zero" onClick={handleNumber}>0</div>
        <div id="decimal" onClick={handleDecimal}>.</div>
      </div>
    </div>
  );
}

export default App;