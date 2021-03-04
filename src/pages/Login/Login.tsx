import { useState } from 'react';

import { useAuth } from '../../contexts/auth'

import Button from '@material-ui/core/Button';
import { CssBaseline } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const SignIn: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const { Login }  = useAuth();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    try {
      await Login({
        email: email,
        password: password,
      });
    } catch (error) {
      alert(error);
    }
    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form id="form" className={classes.form} onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
            />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Senha"
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;