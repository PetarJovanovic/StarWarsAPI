const fetch = require('node-fetch');
const { Headers } = require('node-fetch');

const fetchToken = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Method", "POST");
  
    const urlencoded = new URLSearchParams();
    urlencoded.append("username", process.env.USERNAME1);
    urlencoded.append("password", process.env.PASSWORD);
    urlencoded.append("grant_type", "password");
    urlencoded.append("client_id", "abc");
    urlencoded.append("client_secret", "123");
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow' 
    };

    const response = await fetch('https://api.swgoh.help/auth/signin', requestOptions);
    const data = await response.json();
    
    return data.access_token;
}

module.exports = fetchToken;