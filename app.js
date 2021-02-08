const months = [
  'Januari',
  'Februari',
  'Mars',
  'April',
  'Maj',
  'Juni',
  'Juli',
  'Augusti',
  'September',
  'Oktober',
  'November',
  'December',
];
const weekdays = [
  'Söndag',
  'Måndag',
  'Tisdag',
  'Onsdag',
  'Torsdag',
  'Fredag',
  'Lördag',
];

const deadline = document.querySelector('.deadline');
const giveaway = document.querySelector('.giveaway');
// Vi pekar på alla h4:or. Returnerar en nodelist med h4:or
const items = document.querySelectorAll('.deadline-format h4');

/* 
console.log(items);
RESULTAT: 
NodeList(4)
0: h4.days
1: h4.hours
2: h4.mins
3: h4.secs
*/
//Om vi ska ange ett spec. datum skrivs det i parentesen. OBS! Månader är zero-based (maj = 4)
let futureDate = new Date(2021, 5, 25, 00, 00, 0);
const year = futureDate.getFullYear();
const month = futureDate.getMonth();
const monthName = months[month];
const day = futureDate.getDay();
const dayName = weekdays[day];
const date = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const seconds = futureDate.getSeconds();

giveaway.textContent = `Midsommar ${year}  ${dayName} ${date} ${monthName}  `;

//Future time in milliseconds
const futureTime = futureDate.getTime();
//console.log(futureTime); //Returnerar: 1621870200000

//Räkna ut tidsskillnad i millisec mellan futureTime & thisTime

function getRemainingTime() {
  const thisTime = new Date().getTime();
  const diffTime = futureTime - thisTime;
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  const oneSecond = 1000;
  let diffDays = diffTime / oneDay;
  diffDays = Math.floor(diffDays);
  let diffHours = diffTime / oneHour;
  diffHours = Math.floor(diffHours);
  diffHours = diffHours % 24;
  let diffMinutes = diffTime / oneMinute;
  diffMinutes = Math.floor(diffMinutes);
  diffMinutes = diffMinutes % 60;
  let diffSeconds = diffTime / oneSecond;
  diffSeconds = Math.floor(diffSeconds);
  diffSeconds = diffSeconds % 60;

  //Krävs modulus % för att timmar, minuter & sekunder inte ska visa mer än vad som går på en dag (24)/timme(60)/minut(60)
  // console.log(
  //   `Ìts ${diffDays} days : ${diffHours} hours : ${diffMinutes} minutes : ${diffSeconds} seconds left till  ${dayName} ${date} ${monthName} ${hours}:${minutes} ${year}`
  // );
  // Put the diff times in an array
  const values = [diffDays, diffHours, diffMinutes, diffSeconds];

  // Formatting of numbers to webpage. If less than 10 = add a zero to time
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    } else {
      return item;
    }
  }
  //We iterate over our 4 h4 time squares and put in each variables from our arrays indexes
  items.forEach((item, i) => {
    // item.textContent = `${values[i]}`; //Utan format anrop
    item.textContent = format(values[i]); //Anrop av format funktion för att formatera siffror
  });
  if (diffTime < 0) {
    clearInterval(countDown);
    deadline.textContent = `GLAD MIDSOMMAR!  `;
  }
}

//Nu stoppar vi in getRamainingTime funktionen (som displayar tiderna i blåa rutorna) i setInterval funktion. Denna tar två params = VAD vi ska visa och hur ofta. I ms.
let countDown = setInterval(getRemainingTime, 1000);
getRemainingTime();

/* 
diffTime returnerar tidskillnad i ms 9091601205
1s = 1000ms
1m = 60s
1h = 60min
1day = 24h

Hur många ms/dag?
3600 * 24 * 1000 = 86 400 000 ms
Hur många dagar (86400000 går det på tidsskillnaden?
  diffTime/86400000 ger antal dagar
*/
