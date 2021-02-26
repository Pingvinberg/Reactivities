import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {v4 as uuid} from 'uuid';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditmode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }  

  function handleFormOpen(id?: string)
  {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditmode(true);
  }

  function handleFormClose()
  {
    setEditmode(false);
  }

  function handleCreateorEditActivity(activity: Activity) {
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
        : setActivities([...activities, {...activity, id: uuid()}]);
    setEditmode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string)
  {
    setActivities([...activities.filter(x=>x.id !== id)])
    setEditmode(false);
    setSelectedActivity(undefined);
  }

  return (
    <>
      <NavBar  openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateorEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>

    </>
  );
}

export default App;