import React from 'react'

const Signin = () => {
  return (
    <form>
      <label htmlFor='name'>Name</label>
      <input type='text' id='name'/>
      <label htmlFor='email'>Email</label>
      <input type='email' id='email'/>
      <label htmlFor='password'>Password</label>
      <input type='password' id='password'/>
      <button>submit</button>
    </form>
  )
}

export default Signin