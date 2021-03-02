import { observer } from 'mobx-react-lite';
import React, { ChangeEvent } from 'react'
import { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

export default observer( function ActivityForm() {

    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, updateActivity, deleteActivity, loading } = activityStore;
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

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
    

    const [activity, setActivity] = useState(initialState);

    function handleSubmit()
    {
        activity.id ? updateActivity(activity) : createActivity(activity);                    
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>)
    {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }   

    const handleDropDownChange = (event: any, data: any) => {
        activity.category = data.value;
    }   
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Select placeholder='Category' defaultValue={activity.category} search name='category' fluid options={categoryOptions} onChange={handleDropDownChange}/>
                <Form.Input type='date' placeholder='Date' defaultValue={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} onClick={() => deleteActivity(activity.id)} floated='left' negative type='button' content='Delete'/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={() => closeForm()} floated='right'  type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})