import React, {useState, useEffect} from 'react';
import './Login.css';
import LoginDarkMode from './LoginDarkMode';
import LoginLightMode from './LoginLightMode';
function Login() {
   const [darkMode, setDarkMode] = useState(false);
  
  const url = process.env.REACT_APP_USER_TOKEN;
  const user = provves.env.REACT_APP_USER_TOKEN; 
  const pass = 123456;
  const encodeData = btoa(user + ":" + pass);
  const httpOptions = {
    headers: ({
      "Authorization": "Basic " + encodeData,
      "Content-Type": "application/x-www-form-urlencoded"
    })
  } 
  const parametros = "username " + user + "&password " + pass + "&grant_type=password"
  let myHeaders = new Headers();
myHeaders.append("Authorization", "Basic " + encodeData);
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

let urlencoded = new URLSearchParams();
urlencoded.append("username", "jcieza90@gmail.com");
urlencoded.append("password", "123456");
urlencoded.append("grant_type", "password");
  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    }
    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log("Okey"))
    .catch(error => console.log('error', error));
  }, []); 

  return (
    <section>
    {darkMode === false ? <LoginLightMode/> : <LoginDarkMode/> }
    </section>
  );
}

export default Login;
