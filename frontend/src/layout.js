import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Leftbar from '~/src/Leftbar';
import '~/src/index.scss';
import ClientList from '~/src/clients/ClientList';
import EditClientForm from '~/src/clients/ClientForm';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import NavBar from '~/src/NavBar';
import Login from './auth/components/Login';
import Registration from './auth/components/Registration';
import Grid from '@material-ui/core/Grid';
import * as auth from './auth/authCalls';
import Paper from '@material-ui/core/Paper';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      auth.loggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/auth/login',
            state: {from: props.location},
          }}
        />
      )
    }
  />
);

const Home = () => {
  return <Paper>
    <Toolbar>
      <Typography variant="title" id="tableTitle">
        Inicio
      </Typography>
    </Toolbar>
    <div style={{padding: 40}}><p>{'Bienvenidos al sistema de registro de clientes en Openpay, que lo disfruten ;)' }</p></div>
  </Paper>;
};


const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    position: 'fixed',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingTop: '90px',
    [theme.breakpoints.between('md', 'xl')]: {
      marginLeft: '240px',
    },
  },
  divForm: {
    padding: '40px',
  },
});


class Root extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({mobileOpen: !state.mobileOpen}));
  };

  render() {
    const {classes, theme} = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <br />
          <Typography variant="title" color="inherit" noWrap>
            OP Registrator!
          </Typography>
        </div>
        <Divider />
        <Leftbar />
      </div>
    );

    return (
      <Router>
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}>
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}>
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}>
              {drawer}
            </Drawer>
          </Hidden>

          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container>
              <Grid item xs={12} md={7}>
                <div>
                  <Route exact path="/auth/login" component={Login} />
                  <Route
                    exact
                    path="/auth/registration"
                    component={Registration}
                  />
                  <PrivateRoute
                    exact
                    path="/admin"
                    component={Home}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/clientes/"
                    component={ClientList}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/clientes/add/"
                    component={EditClientForm}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/clientes/edit/:id"
                    component={EditClientForm}
                  />
                </div>
              </Grid>
            </Grid>
          </main>
        </div>
      </Router>
    );
  }
}

Root.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Root);
