/* eslint-disable class-methods-use-this */
import Navbar from "../Components/Navbar/Navbar";
import Navigate from "../Components/Router/Navigate";
import {  setAuthenticatedUser } from '../utils/auths';

class UserLibrary{

    async onRegister(e) {

        e.preventDefault();
        const firstname = document.querySelector('#firstname').value;
        const lastname = document.querySelector('#lastname').value;
        const mail = document.querySelector('#registerUsername').value;
        const registerPassword = document.querySelector('#registerPassword').value;
        const registerConfPassword = document.querySelector('#registerConfPassword').value;
      
        if(registerPassword !== registerConfPassword) {
          throw new Error(`The password is not the same`);
        }
      
        const options = {
          method: 'POST',
          body: JSON.stringify({
            "firstname": firstname,
            "lastname": lastname,
            "email": mail,
            "password": registerPassword,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        
      
        const response = await fetch(`${process.env.API_BASE_URL}/auths/register`, options);
        const authenticatedUser = await response.json();
      
        try{
          if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      
          setAuthenticatedUser(authenticatedUser);
          Navbar();
          Navigate('/');
        }catch(error){
          alert(authenticatedUser);
        }
        
    }

      async onLogin(e) { 
        
        e.preventDefault();
      
        const mail = document.querySelector('#loginUsername').value;
        const password = document.querySelector('#loginPassword').value;
      
        const options = {
          method: 'POST',
          body: JSON.stringify({
            "email": mail,
            "password": password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        
        
        try {
          const response = await fetch(`${process.env.API_BASE_URL}/auths/login`, options);
      
          if (!response.ok) {
            throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
          }
      
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const authenticatedUser = await response.json();
            setAuthenticatedUser(authenticatedUser);
            Navbar();     
            Navigate('/');
          } else {
            alert('Login failed: Server response is not in JSON format.');
          }
        } catch (error) {
        
          alert(error.message);
        }
    }
      

}
export default UserLibrary;