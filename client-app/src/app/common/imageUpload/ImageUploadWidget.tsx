import React, { useEffect, useState } from 'react'
import { Button, Grid, GridColumn, Header, Segment } from 'semantic-ui-react'
import ImageUploadDropzone from './ImageUploadDropzone'
import { Cropper } from 'react-cropper'
import ImageUploadCropper from './ImageUploadCropper';

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

export default function ImageUploadWidget({loading, uploadPhoto}: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if(cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!))
        }
    };

    useEffect (() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        }
    }, [files])

    return (
        <Grid>
            <GridColumn width={4}>
                <Header sub color='teal' content='Step 1 Add Photo'/>
                <Segment>
                    <ImageUploadDropzone setFiles={setFiles}/>
                </Segment>
            </GridColumn>
            <Grid.Column width={1}/>
            <GridColumn width={4}>
                <Header sub color='teal' content='Step 2 Resize Image'/>
                {files && files.length > 0 && (
                    <ImageUploadCropper setCropper={setCropper} imagePreview={files[0].preview}/>
                )}
            </GridColumn>
            <Grid.Column width={1}/>
            <GridColumn width={4}>
                <Header sub color='teal' content='Step 3 Preview and Upload'/>
                {files && files.length > 0 &&
                    <>
                        <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
                        <Button.Group widths={2}>
                            <Button loading={loading} onClick={onCrop} positive icon='check' />
                            <Button disabled={loading} onClick={() => setFiles([])} icon='close' />
                        </Button.Group>
                    </>}
            </GridColumn>
        </Grid>
    )
}