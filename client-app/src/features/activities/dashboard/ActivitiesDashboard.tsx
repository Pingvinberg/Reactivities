import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, Sticky } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivitiesDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivitiesList';

export default observer( function ActivityDashboard() {

    const {activityStore} = useStore();

    const {selectedActivity, editMode} = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>                
                <ActivityList />
            </Grid.Column>            
            <Grid.Column width='6'>
                { selectedActivity && !editMode &&
                <Sticky offset={100}>
                    <ActivityDetails/>
                </Sticky>} 
                { editMode &&
                <Sticky offset={100}>
                    <ActivityForm />
                </Sticky>}
            </Grid.Column>
        </Grid>
    )
})