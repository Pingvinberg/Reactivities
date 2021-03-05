import React from 'react';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivitiesDetails from '../../features/activities/details/ActivitiesDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

function App() {
  const location = useLocation();  

  return (
    <>
      <Route exact path='/' component={HomePage}/>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route 
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />           
            <Container style={{marginTop: '7em'}}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard}/>
                <Route key={location.key} path={['/createActivity', '/manage/:id' ]}component={ActivityForm}/>
                <Route exact path='/activities/:id' component={ActivitiesDetails}/>
                <Route exact path='/errors' component={TestErrors}/>
                <Route exact path='/server-error' component={ServerError}/>
                <Route component={NotFound}/>
              </Switch>
              </Container>
          </>
        )}      
      />      
    </>
  );
}

export default observer(App);