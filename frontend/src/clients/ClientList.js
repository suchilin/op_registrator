import React from 'react';
import {Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DetailsIcon from '@material-ui/icons/Details';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Tooltip} from '@material-ui/core';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import {fetchClientsData, deleteClient} from '~/src/api/calls';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  button: {
    position: 'fixed',
  },
  spacer: {
    flex: '1 1 100%',
  },
  table: {
    minWidth: 720,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, clients: [], open: false, client_id: null};
  }
  componentDidMount = () => {
    this.setState({loading: true});
    fetchClientsData().then(resp => {
      this.setState({loading: false, clients: resp.data});
    });
  };

  onClick = (e, client_id) => {
    e.preventDefault();
    this.setState({open: true, client_id: client_id});
  };

  handleClose = e => {
    e.preventDefault();
    this.setState({open: false});
  };

  deleteC = e => {
    e.preventDefault();
    deleteClient(this.state.client_id).then(resp => {
      let clients = this.state.clients.filter(
        client => client.id != this.state.client_id,
      );
      this.setState({open: false, clients: clients});
    });
  };

  toCreateClient = () => {
    this.props.history.push('/admin/clientes/add');
  };

  render() {
    const {classes} = this.props;
    if (this.state.loading) {
      return <p>loading ...</p>;
    } else {
      return (
        <div>
          <Paper>
            <Toolbar>
              <Typography variant="title" id="tableTitle">
                Clientes
              </Typography>
              <div className={classes.spacer} />
              <Button onClick={e => this.toCreateClient()}>Añadir</Button>
            </Toolbar>
            <div className={this.props.classes.tableWrapper}>
              <Table className={this.props.classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Apellidos</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.clients.map(client => {
                    return (
                      <TableRow key={client.id}>
                        <TableCell>{client.id}</TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{client.last_name}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>
                          <a href="" onClick={e => this.onClick(e, client.id)}>
                            <DeleteIcon />
                          </a>
                          <Link to={'/admin/clientes/edit/' + client.id}>
                            <EditIcon />
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Paper>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
		      Esta seguro de borrar <b>permanentemente</b> este cliente?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={e => this.handleClose(e)} variant="contained" color="primary">
                Cancelar
              </Button>
              <Button onClick={e => this.deleteC(e)} variant="contained" color="secondary" autoFocus>
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
}

export default withStyles(styles)(ClientList);
