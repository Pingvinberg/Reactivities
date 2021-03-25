import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useState } from 'react'
import { Card, Header, Tab, Image, Grid, GridColumn, Button, Checkbox } from 'semantic-ui-react'
import ImageUploadWidget from '../../app/common/imageUpload/ImageUploadWidget';
import { Photo, Profile } from '../../app/models/profile'
import { useStore } from '../../app/stores/store';

interface Props {
    profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
    const { profileStore: { isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto, deletePhoto } } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [editPhotoMode, setEditPhotoMode] = useState(false);
    const [target, setTarget] = useState('');    

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }



    return (
        <Tab.Pane>
            <Grid>
                <GridColumn width={16}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentUser && (
                        <>
                        <Button.Group floated='right'>                        
                            {editPhotoMode && (
                                <Button                                                                        
                                    content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                                    icon={addPhotoMode ? 'reply' : 'add'}
                                    onClick={() => setAddPhotoMode(!addPhotoMode)}
                                />
                            )}
                        </Button.Group>
                            <Checkbox                                                                                              
                                disabled={addPhotoMode}
                                toggle                            
                                label={editPhotoMode ? 'Stop Manage Photos' : 'Manage Photos'}
                                checked={editPhotoMode}
                                onChange={() => setEditPhotoMode(!editPhotoMode)}
                            />
                        </>
                        )
                    }

                </GridColumn>
                <GridColumn width={16}>
                    {addPhotoMode ? (
                        <ImageUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile.photos!.map(photo => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                    { editPhotoMode && (
                                        <Button.Group fluid widths={2}>
                                            <Button
                                                basic
                                                color='green'
                                                content='Main'
                                                name={'main' + photo.id}
                                                disabled={photo.isMain}
                                                onClick={e => handleSetMainPhoto(photo, e)}
                                                loading={target === 'main' + photo.id && loading}
                                            />
                                            <Button
                                                basic
                                                color='red'
                                                content='Delete'
                                                name={photo.id}
                                                disabled={photo.isMain}
                                                onClick={e => handleDeletePhoto(photo, e)}
                                                loading={target === photo.id && loading}
                                            />
                                        </Button.Group>
                                    )}
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </GridColumn>
            </Grid>

        </Tab.Pane>
    )
})