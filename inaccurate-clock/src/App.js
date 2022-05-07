import './App.css';
import {useEffect, useState} from "react";
import Select from '@mui/material/Select';
import {InputLabel, MenuItem} from "@mui/material";

const timeUrl = "http://worldtimeapi.org/api/ip";
const accuracyRange = ['secondsish','minutesish', 'hoursish', 'daysish', 'monthsish','yearsish'];
const accuracyRangeFn = ['getSeconds','getMinutes', 'getHours', 'getDay', 'getMonth', 'getFullYear'];
const TimeStrings = [
    ['just after the start of the *', 'a few past the *'],
    ['a quarter past the *', 'about a fourth of the way through the *'],
    ['half past the *', 'halfway through the *'],
    ['the bottom of the *', 'almost the end of the *'],
    ];

function App() {

  const [timeData, setTimeData] = useState({});
  const [accuracy, setAccuracy] = useState(0);

  const handleChange = (event) => {
       setAccuracy(event.target.value);
  };

    const getQuarter = (value, maxValue) =>  {
        const percent = Math.round((value / maxValue) * 100);
        let quarter;
        if (percent < 25) {
            quarter = 0;
        }
        else if (percent >= 25 && percent < 50) {
            quarter = 1;
        }
        else if (percent >= 50 && percent < 75) {
            quarter = 2;
        }
        else if (percent >= 75) {
            quarter = 3;
        }
        return quarter;
    }

  const renderValue = (value) => {
      return accuracyRange[value];
  }
  useEffect(() => {
    getTime();
  }, []);

  const getTime = async () => {
    const response = await fetch(timeUrl);
    const jsonData = await response.json();
    setTimeData(jsonData);
  };

  const getFluffForValue = (value) => {
      const literal = `${value}`;
      const lastDigit = literal.substring(literal.length - 1);
      switch (lastDigit) {
          case '1':
              return 'st';
          case '2':
              return 'nd';
          case '3':
              return 'rd';
          default:
              return 'th';
      }
  }

  const formatTime = (datetime) => {
      const date = new Date(datetime);

    let value = date[accuracyRangeFn[accuracy]]();
    let displayValue = date[accuracyRangeFn[accuracy+1]]();
    if (Number.isNaN(value)) {
        return '';
    }
    let maxValue;

    const label = accuracyRange[accuracy].split('ish')[0];
    const displayLabel = accuracyRange[accuracy+1].split('sish')[0];
      switch (label) {
          case 'minutes':
          case 'seconds':
              maxValue = 60;
              break;
          case 'hours':
              maxValue = 24;
              break;
          case 'days':
              maxValue = 31;
              break;
          case 'months':
              maxValue = 12;
              value += 1;
              break;
          default:
              break;
      }
      const quarter = getQuarter(value, maxValue);
      const formattedString = TimeStrings[quarter][Math.round(Math.random())].replace('*',`${displayValue}${getFluffForValue(displayValue)} ${displayLabel}`);
    return formattedString;
  };

  return (
      <div className="App">
        <header className="App-header">
          <h2>Get Time(ish) By IP</h2>
        </header>
        <div className="user-container">
            <InputLabel id="demo-simple-select-label">How accurately would you like to know the time?</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={accuracy}
                label="Accuracy"
                renderValue={renderValue}
                onChange={handleChange}
            >
                {accuracyRange.map((range, index) => {
                    if (index < accuracyRange.length - 1) {
                        return (<MenuItem value={index} key={range}>{range}</MenuItem>);
                    }

                })}

            </Select>
            <button onClick={getTime}>
                What time is it?
            </button>
        </div>
      <div>
          <span>It's {formatTime(timeData.datetime)}</span>
      </div>
      </div>
  );
}

export default App;
