import { observer } from 'mobx-react-lite';
import { useEffect } from 'react'
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';



export default observer( function ActivityForm() {
    
    const history = useHistory();
    const {activityStore} = useStore();
    const {deleteActivity, loading, loadActivity, createActivity, updateActivity} = activityStore;
    const {id} = useParams<{id:string}>();
    const [activity, setActivity] = useState<Activity>({
        id: '', 
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });
    
    const validationSchema = Yup.object({
        title: Yup.string().required(),
        category: Yup.string().required(),
        description: Yup.string().required(),
        date: Yup.date().required("Date is required").nullable(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
    })

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);       

    function handleFormSubmit(activity: Activity) {
        if(!activity.id) {
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

    if(loading) return <LoadingComponent content='loading activity...'/>
    
    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />          
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ isValid, isSubmitting, dirty }) => (
                    <Form className='ui form'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea name='description' placeholder='Description' rows={3} />
                        <MySelectInput options={categoryOptions} name='category' placeholder='Category' />
                        <MyDateInput                             
                            name='date'
                            placeholderText='Date'
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy HH:mm'
                            timeFormat='HH:mm'
                            showTimeSelect
                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput name='city' placeholder='City' />
                        <MyTextInput name='venue' placeholder='Venue' />
                        <Button onClick={() => handleDelete(activity.id)} negative floated='left' type='button' content='Delete' />                        
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            positive 
                            type='submit' 
                            floated='right' 
                            content='Submit'
                        />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})