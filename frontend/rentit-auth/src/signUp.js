import { useState } from 'react'

function SignUp() {
  const [email, setEmail]= useState('')
  const [password, setPassword] = useState('')

  async function signUpUser(event) {
    event.preventDefault()
    const response = await fetch('http://rentit.dev/user/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    })

    const data = await response.json()
    console.log(data)
  }

  return (
  <div>
    <h1>Sign Up</h1>
    <form onSubmit={signUpUser}>
      <input 
      value={email} 
      onChange={(e) => setEmail(e.target.value)}
      type="email"
      placeholder="Email"
      />

      <input
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      type="password"
      placeholder="Password"
      />
      <br />
      <input type="submit" value="SignUp" />

    </form>
  </div>
  );
}

export default SignUp;
