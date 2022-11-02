import React, { useState, useEffect } from 'react';
import MenuBar from '../components/MenuBar';
import { Avatar, DialogContent, DialogContentText, TextField } from '@mui/material';


const Settings = () => {
    const { user } = JSON.parse(localStorage.getItem("VoloUser"));
    const [selectImage, setSelectImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)


    //username change
    const [username, setUsername] = useState(user);


    useEffect(() => {
        if (selectImage) {
            setPreviewImage(URL.createObjectURL(selectImage));
        }
    }, [selectImage]);

    const uploadImg = () => {
        const data = new FormData()
        data.append('file')
        data.append('upload_present', 'volo')
        data.append('cloud_name', 'drummer-designs')
    }
    const changeUsername = () => {
        console.log('new username')
    }
    return (
        <div className='dashboard'>
            <header>
                <MenuBar />
            </header>
            <div className='container'>
                <div className="main">
                    <form>
                        <DialogContent dividers>
                            <DialogContentText>
                                Profile information can be updated here
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin='normal'
                                type='text'
                                inputProps={{ minLength: 2 }}
                                fullWidth
                                variant='standard'
                                value={username || ''}
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="image">
                                <input type='file' accept='image/*' id='select-image' onChange={e => setSelectImage(e.target.files[0])} />
                                {previewImage && selectImage && (<img src={previewImage} alt={selectImage.name} height='100px' />)}
                            </label>
                            <Avatar sx={{ width: 24, height: 24 }}/>

                        </DialogContent>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Settings

