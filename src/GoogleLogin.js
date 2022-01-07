import React from 'react'
import './Style/Login.css'
import {GoogleLogin} from 'react-google-login'

const GoogleLogin = () => {
    return (
        <div>
              <GoogleLogin  ref={ref}
                 clientId="766075204483-lulb8u6h2g1v0h8kp0gsnirlntf170en.apps.googleusercontent.com"
                 buttonText="Login With Google"
                 onSuccess={responseGoogle}
                 onFailure={responseGoogle}
                 cookiePolicy={'single_host_origin'}
        />
        </div>
    )
}

export default GoogleLogin
