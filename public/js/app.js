console.log("Client side");

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//   res.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch('http://localhost:3000/weather?address=Calgary').then((res) => {
//   res.json().then(({forecast, location, address} = {}) => {
//     if(!forecast) {
//       return console.log('Error: Probably not a good address');
//     }
//     console.log(forecast, location, address);
//   });
// });

const addressForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';

addressForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;
  // console.log(location);

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch('/weather?address=' + location).then((res) => {
    res.json().then(({forecast, location, humidty, address} = {}) => {
      if(!forecast) {
        messageOne.textContent = '';
        return messageTwo.textContent = 'Error: Probably not a good address';
      }
      messageOne.textContent = location;
      messageTwo.textContent = forecast + " " + humidty + "%";
    });
  });
  search.value = '';
});