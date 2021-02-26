import React from 'react';
import { Grid, Sticky } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivitiesDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivitiesList';


interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id:string) => void;
}

export default function ActivityDashboard({activities, selectedActivity, selectActivity,
     cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} 
                    selectActivity={selectActivity} 
                />
            </Grid.Column>
            <Grid.Column width='6'>
                <Sticky offset={100}>
                {selectedActivity && !editMode &&
                <ActivityDetails 
                    activity={selectedActivity} 
                    cancelSelectActivity={cancelSelectActivity}
                    openForm={openForm}
                     
                />} 
                { editMode && 
                    <ActivityForm 
                        activity={selectedActivity}
                        closeForm={closeForm}
                        createOrEdit={createOrEdit}
                        deleteActivity={deleteActivity}
                    />
                } 
                </Sticky>
            </Grid.Column>
        </Grid>
    )
}