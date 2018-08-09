import React from 'react';
import {registration} from '../authCalls';
import FormHOC from './../../utils/FormHOC';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  clientTextField: {
    marginBottom: '30px',
  },
  divForm: {
    padding: '40px',
  },
});

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form_errors: '',
    };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  onSubmitHandler = e => {
    e.preventDefault();
    let user = {
      username: this.props.fields.username,
      password: this.props.fields.password,
    };
    registration(user)
      .then(response => {
        this.props.history.push('/auth/login/');
      })
      .catch(error => {
        this.setState({
          form_errors: 'Usuario o contraseña equivocados!',
        });
      });
  };
  render = () => {
    return (
      <Paper>
        <Toolbar>
          <Typography variant="title" id="tableTitle">
            Registrarse
          </Typography>
        </Toolbar>
        <div className={this.props.classes.divForm}>
          <form onSubmit={this.onSubmitHandler}>
            <TextField
              className={this.props.classes.clientTextField}
              error={this.props.errors.username}
              helperText={this.props.errors.username}
              type="text"
              name="username"
              label="Enter username here ..."
              value={
                this.props.fields.username ? this.props.fields.username : ''
              }
              onChange={this.props.onChangeHandler}
              required
              margin="dense"
              fullWidth
            />
            <TextField
              className={this.props.classes.clientTextField}
              error={this.props.errors.password}
              helperText={this.props.errors.password}
              type="password"
              name="password"
              label="Introduzca la contraseña aqui ..."
	      inputProps={{min: 8}}
              value={
                this.props.fields.password ? this.props.fields.password : ''
              }
              onChange={this.props.onChangeHandler}
              required
              margin="dense"
              fullWidth
            />
            <TextField
              className={this.props.classes.clientTextField}
              error={this.props.errors.password2}
              helperText={this.props.errors.password2}
              type="password"
              name="password2"
              label="Confirme la contraseña aqui ..."
	      inputProps={{equalto: "password"}}
              value={
                this.props.fields.password2 ? this.props.fields.password2 : ''
              }
              onChange={this.props.onChangeHandler}
              required
              margin="dense"
              fullWidth
            />
            <center>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  !(
                    this.props.touches.username &&
                    this.props.touches.password &&
                    this.props.touches.password2 &&
                    Object.keys(this.props.errors).length === 0 &&
                    this.props.touches.password == this.props.touches.password2
                  )
                }>
                Registrarse
              </Button>
            </center>
            {this.state.form_errors}
          </form>
        </div>
      </Paper>
    );
  };
}

export default withStyles(styles)(FormHOC(Registration));
