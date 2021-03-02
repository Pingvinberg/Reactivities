import React from 'react';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivitiesDetails from '../../features/activities/details/ActivitiesDetails';

function App() {
  const location = useLocation();  

  return (
    <>
      <Route exact path='/' component={HomePage}/>
      <Route 
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />           
            <Container style={{marginTop: '7em'}}>
              <Route exact path='/activities' component={ActivityDashboard}/>
              <Route key={location.key} path={['/createActivity', '/manage/:id' ]}component={ActivityForm}/>
              <Route exact path='/activities/:id' component={ActivitiesDetails}/>
              </Container>
          </>
        )}      
      />      
    </>
  );
}

export default observer(App);