import React, { useEffect, useState } from 'react';
import {v4 as uuid} from 'uuid';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import agent from '../api/agent';
import NavBar from './NavBar';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditmode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
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
    setSubmitting(true);
    if(activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setEditmode(false);
        setSelectedActivity(activity);
      });
    }
    else {
      activity.id = uuid();
      agent.Activities.create(activity);
      setActivities([...activities, activity]);
      setEditmode(false);
      setSelectedActivity(activity);
    }
    setSubmitting(false);
  }

  function handleDeleteActivity(id: string)
  {
    setSubmitting(true)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x=>x.id !== id)])
      setEditmode(false);
      setSelectedActivity(undefined);
    });
    setSubmitting(false);    
  }

  //if(loading) return <LoadingComponent />

  return (
    <>
      <NavBar  openForm={handleFormOpen}/>           
      <Container style={{marginTop: '7em'}}>
        {loading &&
        <LoadingComponent/>}                 
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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;