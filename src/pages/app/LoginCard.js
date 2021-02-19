import React from 'react'
import netlifyIdentity from 'netlify-identity-widget'

import IdentityContext from '../../../IdentityContext'

const LoginCard = () => {
    return(
    <div class="card">
    <div class="alert alert-warning">
      You are Not Logged In to any registered account.
    </div>
    <div class="card-body">
      <h5 class="card-title">Please Login</h5>
      <p class="card-text">To use our services please login to a registered account. If your do not have a registered account. please 
      Sign up with us to enjoy our valuable services</p>
      <input type='submit' className='btn btn-primary' value='Log In' onClick={() => netlifyIdentity.open()}/>
    </div>
  </div>
    )
}

export default LoginCard