import './App.css';
import React, {useState,useRef, useEffect} from "react";
import Sidebar from './Sidebar';
import Feed from './Feed';
import Right from './Right';
import Notification from './Notification';
import {GoogleLogin} from 'react-google-login'
import db from './firebase'
import a from './tt.png'
import { ImTwitter } from 'react-icons/im';
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';


function App() {

  const [name, setName] =useState('');
  const [email, setEmail] =useState('');
  const [avatar, setAvatar] =useState('');


  function responseGoogle (response){
    
    setEmail(response.profileObj.email)           
    setName(response.profileObj.name)           
    setAvatar(response.profileObj.imageUrl)           
      
  }

  useEffect(() => {
    {
      db.collection('users').doc().set({
        username: name,
        email: email,
        avatar: avatar,
      })
    }
  }, [])


  
  return (
    <div> 
          {!name? ( 

                 <div className="left">
                   <img src={a}/>
                   <ImTwitter color='#00a2ff' size='40px' className='ttrico'/>
                    <h1 style={{float:'left', marginLeft:'-3%', minWidth:'35%', marginTop:'15%', fontSize:'60px'}}>
                      Happened Before! 
                      <span style={{float:'left',marginTop:'3%', marginLeft:'2%'}}>
                      <p2 style={{fontSize:'30px'}} > Join TanTwitter today.</p2>
                      </span>
                    </h1>


                <div className='login'>
                     <GoogleLogin 
                      render={renderProps => (
                        <button className='loginbtn' onClick={renderProps.onClick} disabled={renderProps.disabled}><p style={{fontSize:'20px', color:'white'}}>Log In With Google</p></button>
                      )}
                      clientId="766075204483-lulb8u6h2g1v0h8kp0gsnirlntf170en.apps.googleusercontent.com"
                      buttonText="Login With Google"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={'single_host_origin'}
                      isSignedIn={true}
                 />
              </div> 
              </div>) 
        :( <div className='app'>        
         <Router>

           <Sidebar name={name} avatar={avatar}/>
           
            <Switch>

              <Route path="/React-TwitterClone">
              <Feed name={name} avatar={avatar}/>
              </Route>              
              <Route path="/notification">
               <Notification name={name}/>
              </Route>

            </Switch> 

            <Right/>

        
      </Router>  
      </div>
     )}
   
    </div>
  );
}

export default App;