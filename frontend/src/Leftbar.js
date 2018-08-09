import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import {withRouter} from 'react-router-dom';
import * as auth from '~/src/auth/authCalls';

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Leftbar extends React.Component {
  state = {open: true};

  handleClick = () => {
    this.setState(state => ({open: !state.open}));
  };

  goToLocation = (e, location) => {
    e.preventDefault();

    switch (location) {
      case 'home':
        this.props.history.push('/admin');
        break;
      case 'clientes':
        this.props.history.push('/admin/clientes');
        break;
      case 'login':
        this.props.history.push('/auth/login');
        break;
      case 'registration':
        this.props.history.push('/auth/registration');
        break;
    }
  };

  logOut = e => {
    e.preventDefault();
    auth.logout();
    this.props.history.push('/auth/login');
  };

  render() {
    const {classes} = this.props;

    return (
      <List
        component="nav"
        subheader={<ListSubheader component="div">Dashboard</ListSubheader>}>
        <ListItem button onClick={e => this.goToLocation(e, 'home')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText inset primary="Panel de inicio" />
        </ListItem>
        {auth.loggedIn() ? (
          <ListItem button onClick={e => this.goToLocation(e, 'clientes')}>
            <ListItemIcon>
              <HowToRegIcon />
            </ListItemIcon>
            <ListItemText inset primary="Clientes" />
          </ListItem>
        ) : (
          ''
        )}
        {auth.loggedIn() ? (
          <ListItem button onClick={e => this.logOut(e)}>
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText inset primary="Cerrar sesion" />
          </ListItem>
        ) : (
          ''
        )}
        {!auth.loggedIn() ? (
          <ListItem button onClick={e => this.goToLocation(e, 'registration')}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText inset primary="Registrarse" />
          </ListItem>
        ) : (
          ''
        )}
        {!auth.loggedIn() ? (
          <ListItem button onClick={e => this.goToLocation(e, 'login')}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText inset primary="Iniciar sesion" />
          </ListItem>
        ) : (
          ''
        )}
      </List>
    );
  }
}

Leftbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Leftbar));
