const apiController = {}
const fetchToken = require('../auth/auth');
const fetch = require('node-fetch');
const { Headers } = require('node-fetch');

apiController.swgohRoster = async (req, res) => {

  const token = await fetchToken();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const allyCode = req.params.allycode;
  const raw = JSON.stringify({
    "allycodes": [
      allyCode
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const responseRoster = await fetch("https://api.swgoh.help/swgoh/roster", requestOptions)
  const dataRoster = await responseRoster.json();

  res.status(200).send(dataRoster);
}

module.exports = apiController
