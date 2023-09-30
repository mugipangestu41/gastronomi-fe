import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [uname, setUsername] = useState('')
  const [pass, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const API_URL = process.env.REACT_APP_API

  const getBeranda = async () => {
    try {
      await axios.get(`${API_URL}beranda/allBeranda`)
      .then(({data}) => {
        localStorage.setItem("judul", data?.data[0]?.judul)
      })
      .catch((err) =>
      {
        if(err.response.status === 404){
          console.log(err)
        }
    })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getBeranda()
    if(localStorage.getItem("token") !== null) { 
      navigate("/admin")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleClick = async () => {
    try {
      await axios.post(`${API_URL}auth/login`,
      {
        username: uname, 
        password: pass
      })
      .then(({data}) => {
        // console.log(data)
        localStorage.setItem("token", data.data[0].token)
        localStorage.setItem("usename", data.data[0].username)
        navigate('/admin', { replace: true });
      })
      .catch((e) => {
        window.alert(e.response.data.messages)
        // console.log("error", err.response.data)
      })
      
      
  } catch (err) {
    console.log(err);
  }
    
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField focused autoComplete="on" value={uname} name="username" label="Username" onChange={(e) => setUsername(e.target.value)} />

        <TextField
          autoComplete="on"
          name="password"
          value={pass}
          label="Password"
          focused
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton style={{marginTop: '20px'}} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
