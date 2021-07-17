import { useState, useEffect } from 'react';
import { getAxios, setAxiosToken } from './get_axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    let user = window.localStorage.getItem('2102_grace_shopper_user');

    if (user) {
      user = JSON.parse(user);
      setToken(user.token);
      setUser(user.user);
      setAxiosToken(user.token);
    }
  }, []);

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSubmit = async () => {
    const axios = getAxios();

    const { data } = await axios.post('/api/users/login', {
      email,
      password,
    });

    setPassword('');
    setEmail('');

    if (data) {
      setUser(data.user);
      setToken(data.token);
      setAxiosToken(data.token);

      window.localStorage.setItem('2102_grace_shopper_user', JSON.stringify(data));
    } else {
      console.error('Failed to login!');
    }
  };

  const getUserInfo = async () => {
    const axios = getAxios();

    const { data } = await axios.get('/api/users/whoami');

    setUserInfo(data);
  }

  if (user) {
    return (
      <div>
        <h1>You logged in successfully!</h1>
        <button onClick={getUserInfo}>Get User Info</button>
        {
          userInfo
            ? <pre>{JSON.stringify(userInfo)}</pre>
            : ''
        }
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>Login</h1>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <label>
          E-Mail
          <input value={email} onChange={handleEmail} />
        </label>
        <label>
          Password
          <input value={password} onChange={handlePassword} type={'password'} />
        </label>
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
}

export default App;
