import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER , AUTH_ERROR , UNAUTH_USER , FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090'; 

export function signinUser({ email , password}){
    
    return function(dispatch){
        
    // Submit email/password to the server 
        
    axios.post(`${ROOT_URL}/signin` , { email , password} )
    
        // If request is good.. 
          .then( response => {

            // -Update state to indicate user is authenticated 
            // this is similar to the $rootScope.broadcast with an event 
            dispatch({ type : AUTH_USER})

            localStorage.setItem('token' , response.data.token);
            // Save the JWT Token 
            //- route the route to '/feature'
            browserHistory.push('/feature');
    
          })
           .catch( () => {
        
            // If request is bad .. 
    
            // show an error to the user 
        
            dispatch(authError('Bad login info'));
        
          });
        
    }  
}

export function authError(error){
    
    return {
        
        type : AUTH_ERROR, 
        payload : error
        
    }
    
}

export function signoutUser(){
    
    localStorage.removeItem("token"); 
    
    return {  
        type : UNAUTH_USER
    }
    
}

export function signupUser( { email , password}){
    
    return function(dispatch){
        
        axios.post(`${ROOT_URL}/signup` , { email , password} )
              .then ( response => {
            
                dispatch({ type : AUTH_USER})

                localStorage.setItem('token' , response.data.token);
                // Save the JWT Token 
                //- route the route to '/feature'
                browserHistory.push('/feature');
            
            }).catch( response => {
            
        
            // If request is bad .. 
    
            // show an error to the user 
        
            dispatch(authError(response.response.data.error));
        
          });
        
    }
     
}

export function fetchMessage(){
    
    return function(dispatch){
        
        axios.get(ROOT_URL , {
            // making a request with the token authorization 
            headers : { authorization : localStorage.getItem('token') }
        })
             .then(response => {
            
               dispatch({
                   
                   type : FETCH_MESSAGE, 
                   payload : response.data.message    
               })
        });
        
        
    }
    
    
}






