import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Link, HashRouter } from 'react-router-dom';
import './App.css';
import logo from './logo.png';
import AddItem from './AddItem';
import ItemsList from './ItemsList';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';

import { logout } from './actions/Auth';
import { clearMessage } from './actions/Message';

import { history } from './helpers/history';

function App() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes('ROLE_MODERATOR'));
      setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };
  return (
    <HashRouter history={history}>
      <div>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <a href='/ItemsList' className='navbar-brand'>
            <img src={logo} alt='logo' className='logo'></img>
          </a>
          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to={'/ItemsList'} className='nav-link'>
                View List
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/AddItem'} className='nav-link'>
                Add Items
              </Link>
            </li>
          </div>
          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to={'/home'} className='nav-link'>
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className='nav-item'>
                <Link to={'/mod'} className='nav-link'>
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className='nav-item'>
                <Link to={'/admin'} className='nav-link'>
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className='nav-item'>
                <Link to={'/user'} className='nav-link'>
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/profile'} className='nav-link'>
                  {currentUser.username}
                </Link>
              </li>
              <li className='nav-item'>
                <a href='/login' className='nav-link' onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/login'} className='nav-link'>
                  Login
                </Link>
              </li>

              <li className='nav-item'>
                <Link to={'/register'} className='nav-link'>
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className='container mt-3'>
          <Switch>
            <Route exact path={['/', '/home']} component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={Profile} />
            <Route path='/user' component={BoardUser} />
            <Route path='/mod' component={BoardModerator} />
            <Route path='/admin' component={BoardAdmin} />
            <Route exact path='/ItemsList' component={ItemsList} />
            <Route exact path='/AddItem' component={AddItem} />
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}
export default App;
