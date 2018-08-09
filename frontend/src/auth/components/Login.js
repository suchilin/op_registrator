import React from 'react';
import * as auth from '../authCalls.js';
import validator from 'validator';
import FormHOC from '../../utils/FormHOC';
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
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form_errors: '',
    };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  onSubmitHandler = e => {
    e.preventDefault();
    auth
      .login(this.props.fields.username, this.props.fields.password)
      .then(() => {
        this.props.history.push('/admin/');
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
            Iniciar sesion
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
              value={
                this.props.fields.password ? this.props.fields.password : ''
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
                    Object.keys(this.props.errors).length === 0
                  )
                }>
                Iniciar sesion
              </Button>
            </center>
            {this.state.form_errors}
          </form>
        </div>
      </Paper>
    );
  };
}
export default withStyles(styles)(FormHOC(Login));
