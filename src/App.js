import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState([]);
  const [activeButton, setActiveButton] = useState(null);

  const handleNumber = (event) => {
    const number = event.target.textContent;
    setActiveButton(event.target.id);

    if (history.length > 0 && display !== '0') {
        const lastChar = display.trim().slice(-1);

        if (display.includes('+') || display.includes('-') || display.includes('*') || display.includes('/')) {
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

    setTimeout(() => setActiveButton(null), 200);
};

  const handleOperator = (event) => {
    const operator = event.target.textContent;
    setActiveButton(event.target.id);
  
    if (display.endsWith('=')) {
      const result = display.slice(0, -1).trim();
      setDisplay(result + ' ' + operator + ' ');
    } else if (!display.endsWith(' ') && !display.endsWith('+') && !display.endsWith('-') && !display.endsWith('*') && !display.endsWith('/')) {
      setDisplay(display + ' ' + operator + ' ');
    }

    setTimeout(() => setActiveButton(null), 200);
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

    setActiveButton('equals');
    setTimeout(() => setActiveButton(null), 200);
};

  const handleDecimal = () => {
    const array = display.split(' ');
    const lastElement = array[array.length - 1];

    if (!lastElement.includes('.')) {
      setDisplay(display + '.');
    }

    setActiveButton('decimal');
    setTimeout(() => setActiveButton(null), 200);
  };

  const handleClear = () => {
    setDisplay('0');
    setHistory([]);
    setActiveButton('clear');
    setTimeout(() => setActiveButton(null), 200);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div id="results">
          <div id="history">
            {history.map((entry, index) => (
              <div key={index}>{entry}</div>
            ))}
          </div>
          <div id="display" className="row">{display}</div>
        </div>
        <div id="clear" className={`row ${activeButton === 'clear' ? 'active' : ''}`} onClick={handleClear}>
          AC
        </div>
        <div id="divide" className={`button ${activeButton === 'divide' ? 'active' : ''}`} onClick={handleOperator}>/</div>
        <div id="multiply" className={`button ${activeButton === 'multiply' ? 'active' : ''}`} onClick={handleOperator}>*</div>
        <div id="seven" className={`button ${activeButton === 'seven' ? 'active' : ''}`} onClick={handleNumber}>7</div>
        <div id="eight" className={`button ${activeButton === 'eight' ? 'active' : ''}`} onClick={handleNumber}>8</div>
        <div id="nine" className={`button ${activeButton === 'nine' ? 'active' : ''}`} onClick={handleNumber}>9</div>
        <div id="subtract" className={`button ${activeButton === 'subtract' ? 'active' : ''}`} onClick={handleOperator}>-</div>
        <div id="four" className={`button ${activeButton === 'four' ? 'active' : ''}`} onClick={handleNumber}>4</div>
        <div id="five" className={`button ${activeButton === 'five' ? 'active' : ''}`} onClick={handleNumber}>5</div>
        <div id="six" className={`button ${activeButton === 'six' ? 'active' : ''}`} onClick={handleNumber}>6</div>
        <div id="add" className={`button ${activeButton === 'add' ? 'active' : ''}`} onClick={handleOperator}>+</div>
        <div id="one" className={`button ${activeButton === 'one' ? 'active' : ''}`} onClick={handleNumber}>1</div>
        <div id="two" className={`button ${activeButton === 'two' ? 'active' : ''}`} onClick={handleNumber}>2</div>
        <div id="three" className={`button ${activeButton === 'three' ? 'active' : ''}`} onClick={handleNumber}>3</div>
        <div id="equals" className={`button ${activeButton === 'equals' ? 'active' : ''}`} onClick={handleEqual}>=</div>
        <div id="zero" className={`button ${activeButton === 'zero' ? 'active' : ''}`} onClick={handleNumber}>0</div>
        <div id="decimal" className={`button ${activeButton === 'decimal' ? 'active' : ''}`} onClick={handleDecimal}>.</div>
      </div>
    </div>
  );
}

export default App;