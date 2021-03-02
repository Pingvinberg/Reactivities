import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect } from 'react'
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';

export default observer( function ActivityForm() {

    const history = useHistory();
    const {activityStore} = useStore();
    const {createActivity, updateActivity, deleteActivity, loading, loadActivity} = activityStore;
    const {id} = useParams<{id:string}>();
    const [activity, setActivity] = useState({
        id: '', 
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });    

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);    

    const categoryOptions = [
        {
            key: 'culture',
            text: 'Culture',
            value: 'culture',
        },
        {
            key: 'drinks',
            text: 'Drinks',
            value: 'drinks',
        },
        {
            key: 'film',            
            text: 'Film',
            value: 'film',
        },
        {
            key: 'food',            
            text: 'Food',
            value: 'food',
        },
        {
            key: 'music',            
            text: 'Music',
            value: 'music',
        },
        {
            key: 'travel',
            text: 'Travel',
            value: 'travel',
        }
    ]    

    function handleSubmit() {
        if(activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }                            
    }

    function handleDelete(id: string) {
        deleteActivity(id).then(() => history.push('/activities'))
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        const {name, value} = event.target
        setActivity({...activity, [name]: value})
    }     
    
    function handleDropDownChange(event: any, data:any) {                  
        setActivity({...activity, category: data.value})
    }

    if(loading) return <LoadingComponent content='loading activity...'/>
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Select placeholder='Category' value={activity.category} search name='category' fluid options={categoryOptions} onChange={handleDropDownChange}/>
                <Form.Input type='date' placeholder='Date' defaultValue={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} onClick={() => handleDelete(activity.id)} floated='left' negative type='button' content='Delete'/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button as={Link} to={'/activities'} floated='right'  type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})