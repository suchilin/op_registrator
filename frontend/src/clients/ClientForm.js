import React from 'react';
import FormHOC from '~/src/utils/FormHOC';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {withStyles} from '@material-ui/core/styles';
import {addClient, updateClient, fetchOneClient} from '~/src/api/calls';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  clientTextField: {
    marginBottom: '30px',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240,
  },
  divForm: {
    padding: '40px',
  },
});

class EditForm_ extends React.Component {
  componentDidMount = () => {
    if (this.props.edit) {
      this.props.setValue('fields', this.props.client);
    }
  };
  onSubmitHandler = e => {
    e.preventDefault();
    let client = {
      id: this.props.fields.id,
      name: this.props.fields.name,
      last_name: this.props.fields.last_name,
      email: this.props.fields.email,
    };
    this.props.savingClient(client);
    window.location.replace('/admin/clientes');
  };
  render() {
    return (
      <Paper>
        <Toolbar>
          <Typography variant="title" id="tableTitle">
            Clientes
          </Typography>
        </Toolbar>
        <div className={this.props.classes.divForm}>
          <form onSubmit={e => this.onSubmitHandler(e)}>
            <TextField
              className={this.props.classes.clientTextField}
              error={this.props.errors.name}
              helperText={this.props.errors.name}
              type="text"
              name="name"
              label="Introduzca el nombre del cliente aqui ..."
              value={this.props.fields.name ? this.props.fields.name : ''}
              onChange={this.props.onChangeHandler}
              required
              margin="dense"
              fullWidth
            />
            <TextField
              className={this.props.classes.clientTextField}
              error={this.props.errors.last_name}
              helperText={this.props.errors.last_name}
              name="last_name"
              label="Introduzca los apellidos aqui ..."
              value={
                this.props.fields.last_name ? this.props.fields.last_name : ''
              }
              onChange={this.props.onChangeHandler}
              required
              fullWidth
            />
            <TextField
              className={this.props.classes.clientTextField}
              error={this.props.errors.email}
              helperText={this.props.errors.email}
              name="email"
              type="email"
              label="Introduzca la cuenta de correo electronico aqui ..."
              value={this.props.fields.email ? this.props.fields.email : ''}
              onChange={this.props.onChangeHandler}
              required
              fullWidth
            />
            <center>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  this.props.edit
                    ? false
                    : !(
                        this.props.touches.name &&
                        this.props.touches.last_name &&
                        this.props.touches.email &&
                        Object.keys(this.props.errors).length === 0
                      )
                }>
                {this.props.edit ? 'Editar cliente' : 'Añadir cliente'}
              </Button>
            </center>
          </form>
        </div>
      </Paper>
    );
  }
}

let EditForm = withStyles(styles)(FormHOC(EditForm_));

class EditClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false};
  }
  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.setState({loading: true, client: null});
      fetchOneClient(this.props.match.params.id).then(resp => {
        this.setState({loading: false, client: resp.data});
      });
    }
  };
  savingClient = client => {
    if (this.props.match.params.id) {
      return updateClient(client);
    } else {
      return addClient(client);
    }
  };

  render = () => {
    if (this.state.loading) {
      return <p>loading ...</p>;
    } else {
      return (
        <EditForm
          savingClient={this.savingClient}
          client={this.state.client}
          edit={this.props.match.params.id}
          history={this.props.history}
        />
      );
    }
  };
}

export default EditClientForm;
