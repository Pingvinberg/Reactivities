import { observer } from 'mobx-react-lite'
import React from 'react'
import { useState } from 'react';
import { Checkbox, Grid, GridColumn, Header, Tab } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import ProfileEditForm from './ProfileEditForm';


export default observer(function ProfileAbout() {
    const {profileStore} = useStore();
    const {isCurrentUser, profile} = profileStore;
    const [editMode, setEditMode] = useState(false);

    return (
        <Tab.Pane>            
            <Grid>
                <GridColumn width={16}>
                    <Header floated='left' icon='user' content={`About ${profile?.displayName}`} />
                    {isCurrentUser && (
                        <Checkbox
                            toggle                            
                            label={editMode ? 'Stop Edit About' : 'Edit About'}
                            checked={editMode}
                            onChange={() => setEditMode(!editMode)}
                        />
                    )}
                </GridColumn> 
                <GridColumn width={16}>
                    {editMode ? <ProfileEditForm setEditMode={setEditMode} /> : 
                        <span style={{whiteSpace: 'pre-wrap'}}>{profile?.bio}</span>
                    }
                </GridColumn>               
            </Grid>
        </Tab.Pane>
    )
})