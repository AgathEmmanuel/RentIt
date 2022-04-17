import { useState } from 'react'

function SignIn() {
  const [email, setEmail]= useState('')
  const [password, setPassword] = useState('')

  async function signInUser(event) {
    event.preventDefault()
    const response = await fetch('http://rentit.dev/user/signin',{
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
    <h1>Sign In</h1>
    <form onSubmit={signInUser}>
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

    </form>
  </div>
  );
}

export default SignIn;
