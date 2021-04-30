import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layouts/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-form/CreateProfile';
import Profiles from './components/profiles/Profiles';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import Profile from './components/profile/Profile';
import AddEducation from './components/profile-form/AddEducation';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import CreatePost from './components/posts/CreatePost';
// Redux Imports
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => { 
  
  // similar to componentDidMount, the empty brackets as second param makes it only run once
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
  <Provider store={store}>
    <Router>
      <div className="App"> {/* was fragment changed to div */}
        <Navbar />
        <Route exact path="/" component={ Landing } />
        {/* This section below is setting up the router for what the paths go to  */}
        <section className="container">
        <Alert /> 
          <Switch>
            <Route exact path="/register" component= { Register } />
            <Route exact path="/login" component= { Login } />
            <Route exact path="/posts" component= { Posts } />
            <Route exact path="/profiles" component= { Profiles } />
            <Route exact path="/profile/:id" component= { Profile } />
            <PrivateRoute exact path="/dashboard" component= { Dashboard } />
            <PrivateRoute exact path="/create-post" component= { CreatePost } />
            <PrivateRoute exact path="/create-profile" component= { CreateProfile } />
            <PrivateRoute exact path="/edit-profile" component= { EditProfile } />
            <PrivateRoute exact path="/add-experience" component= { AddExperience } />
            <PrivateRoute exact path="/add-education" component= { AddEducation } />
            <PrivateRoute exact path="/posts/:id" component= { Post } />
            {/* TODO add a /profile/:id */}
          </Switch>
        </section>
      </div>
    </Router>
  </Provider>
)}

export default App;
