const url = 'https://example.com/counter';

const readCounter = () => {
  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => {
    console.log('fetch success');
    return res.json();
  }).then(json => {
    document.getElementById('counter').textContent = json['Item']['num'];
  });
};
readCounter();
setInterval(readCounter, 2000);

const updateCounter = () => {
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => {
  });
};

const resetCounter = () => {
  fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => {
  });
};
