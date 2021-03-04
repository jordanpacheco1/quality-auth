import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useAuth } from '../../contexts/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: 700,
  }
}));

const Home: React.FC = () => {
  const classes = useStyles();
  const { Logout, user } = useAuth();

  if(!user) {
    return null;
  }

  function handleLogout() {
    Logout();
  }

  return (
    <Container component="main" maxWidth="xs">
      <Card 
        className={classes.root}
        variant='outlined'
      >
        <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <label>Bem Vindo</label>
          {user.name}
        </Typography>
        </CardContent>
        </Card>
        <Card 
        className={classes.root}
        variant='outlined'
      >
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <label>Seu Email:</label>
          {user.email}
        </Typography>
        </CardContent>
      </Card>
      <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogout}
          >
            Logout
          </Button>
    </Container>
  );
};

export default Home;