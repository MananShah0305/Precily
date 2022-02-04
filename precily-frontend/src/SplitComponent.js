import React, { useEffect, useState } from 'react'
import Split from 'react-split'
import './SplitComponent.css'
import axios from './axios'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Filebase from 'react-file-base64';
import TextField from '@mui/material/TextField';
import SweetAlert from 'react-bootstrap-sweetalert'

let temp1ContentAdd = ''
let temp1ImageAdd = ''
let temp1ContentEdit = ''
let temp1ImageEdit= ''

let temp2ContentAdd = ''
let temp2ImageAdd = ''
let temp2ContentEdit = ''
let temp2ImageEdit = ''

let temp3ContentAdd = ''
let temp3ImageAdd = ''
let temp3ContentEdit = ''
let temp3ImageEdit = ''

let alert;

const SplitComponent = () => {

    const [box1, setBox1] = useState({})
    const [box2, setBox2] = useState({})
    const [box3, setBox3] = useState({})
    const [alertStatus, setAlertStatus] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        console.time('getAPI')
        axios.get('box')
            .then((res) => {
                console.timeEnd('getAPI')
                const params = {
                    add: false,
                    edit: false
                }
                setBox1(Object.assign(res.data.box1Doc.boxInfo[0], params))
                setBox2(Object.assign(res.data.box2Doc.boxInfo[0], params))
                setBox3(Object.assign(res.data.box3Doc.boxInfo[0], params))
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        alert = <SweetAlert
            success
            title="Success!"
            onConfirm={onConfirm}
            customButtons={
                <>
                    <Button variant="contained" color="success" onClick={onConfirm}>OK</Button>
                </>
            }>
            <span>{message} &#128512;</span>.
        </SweetAlert>
    }, [message])

    const onConfirm = () => {
        setAlertStatus(false)
        setMessage('')
    }

    const changeValue1 = (e) => {
        setBox1({
            ...box1,
            [e.target.name]: e.target.value
        })
    }

    const addEntry1 = () => {
        if (box1.add) {
            setBox1({
                ...box1,
                add: false
            })
            const body = {
                name: 'box1',
                timestamp: new Date(),
                content: box1.content,
                image: box1.image,
            }
            console.time('time')
            axios.post('/box', body)
                .then(res => {
                    console.timeEnd('time')
                    setAlertStatus(true)
                    setMessage(res.data.message)
                })
                .catch(err => console.log(err))
        }
        else {
            temp1ContentAdd = box1.content
            temp1ImageAdd = box1.image
            setBox1({
                ...box1,
                content: '',
                add: true,
                edit: false
            })
        }
    }

    const updateEntry1 = () => {
        if (box1.edit) {
            setBox1({
                ...box1,
                edit: false
            })
            const body = {
                name: 'box1',
                id: box1._id,
                content: box1.content,
                image: box1.image,
            }
            console.time('time')
            axios.patch(`/box/${body.id}`, body)
                .then(res => {
                    console.timeEnd('time')
                    setAlertStatus(true)
                    setMessage(res.data.message)
                })
                .catch(err => console.log(err))
        }
        else {
            temp1ContentEdit = box1.content
            temp1ImageEdit = box1.image
            setBox1({
                ...box1,
                edit: true,
                add: false,
            })
        }
    }

    const cancelChange1 = () => {
        if (box1.add === true) {
            setBox1({
                ...box1,
                content: temp1ContentAdd,
                image: temp1ImageAdd,
                add: false
            })
        }
        else if (box1.edit === true) {
            setBox1({
                ...box1,
                content: temp1ContentEdit,
                image: temp1ImageEdit,
                edit: false,
            })
        }
    }

    const changeValue2 = (e) => {
        setBox2({
            ...box2,
            [e.target.name]: e.target.value
        })
    }

    const addEntry2 = () => {
        if (box2.add) {
            setBox2({
                ...box2,
                add: false
            })
            const body = {
                name: 'box2',
                timestamp: new Date(),
                content: box2.content,
                image: box2.image,
            }
            console.time('time')
            axios.post('/box', body)
                .then(res => {
                    console.timeEnd('time')
                    setAlertStatus(true)
                    setMessage(res.data.message)
                })
                .catch(err => console.log(err))
        }
        else {
            temp2ContentAdd = box2.content
            temp2ImageAdd = box2.image
            setBox2({
                ...box2,
                content: '',
                add: true,
                edit: false
            })
        }
    }

    const updateEntry2 = () => {
        if (box2.edit) {
            setBox2({
                ...box2,
                edit: false
            })
            const body = {
                name: 'box2',
                id: box2._id,
                content: box2.content,
                image: box2.image,
            }
            console.time('time')
            axios.patch(`/box/${body.id}`, body)
                .then(res => {
                    console.timeEnd('time')
                    setAlertStatus(true)
                    setMessage(res.data.message)
                })
                .catch(err => console.log(err))
        }
        else {
            temp2ContentEdit = box2.content
            temp2ImageEdit = box2.image
            setBox2({
                ...box2,
                edit: true,
                add: false
            })
        }
    }

    const cancelChange2 = () => {
        if (box2.add === true) {
            setBox2({
                ...box2,
                content: temp2ContentAdd,
                image: temp2ImageAdd,
                add: false
            })
        }
        else if (box2.edit === true) {
            setBox2({
                ...box2,
                content: temp2ContentEdit,
                image: temp2ImageEdit,
                edit: false,
            })
        }
    }

    const changeValue3 = (e) => {
        setBox3({
            ...box3,
            [e.target.name]: e.target.value
        })
    }

    const addEntry3 = () => {
        if (box3.add) {
            setBox3({
                ...box3,
                add: false
            })
            const body = {
                name: 'box3',
                timestamp: new Date(),
                content: box3.content,
                image: box3.image,
            }
            console.time('time')
            axios.post('/box', body)
                .then(res => {
                    console.timeEnd('time')
                    setAlertStatus(true)
                    setMessage(res.data.message)
                })
                .catch(err => console.log(err))
        }
        else {
            temp3ContentAdd = box3.content
            temp3ImageAdd = box3.image
            setBox3({
                ...box3,
                content: '',
                add: true,
                edit:false
            })
        }
    }

    const updateEntry3 = () => {
        if (box3.edit) {
            setBox3({
                ...box3,
                edit: false
            })
            const body = {
                name: 'box3',
                id: box3._id,
                content: box3.content,
                image: box3.image,
            }
            console.time('time')
            axios.patch(`/box/${body.id}`, body)
                .then(res => {
                    console.timeEnd('time')
                    setAlertStatus(true)
                    setMessage(res.data.message)
                })
                .catch(err => console.log(err))
        }
        else {
            temp3ContentEdit = box3.content
            temp3ImageEdit = box3.image
            setBox3({
                ...box3,
                edit: true,
                add:false
            })
        }
    }

    const cancelChange3 = () => {
        if (box3.add === true) {
            setBox3({
                ...box3,
                content: temp3ContentAdd,
                image: temp3ImageAdd,
                add: false
            })
        }
        else if (box3.edit === true) {
            setBox3({
                ...box3,
                content: temp3ContentEdit,
                image: temp3ImageEdit,
                edit: false
            })
        }
    }

    return (
        <>
            {
                alertStatus && alert
            }
            <Split sizes={[0, 100, 0]} minSize={[0, 1000, 0]} style={{ display: 'flex', maxWidth: '99.6vw', overflow: 'hidden' }}>
                <div ></div>
                <Split direction='vertical' sizes={[0, 100, 0]} minSize={[0, 500, 0]} style={{ height: '100vh', overflow: 'hidden' }}>
                    <div ></div>
                    <Split direction='vertical' sizes={[30, 70]} minSize={[240, 240]}>
                        <Split style={{ display: 'flex' }} sizes={[40, 60]} minSize={[240, 240]}>
                            <div style={{ backgroundColor: 'rgb(176,208,254)', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                {
                                    box1.add || box1.edit ? (
                                        <>
                                            <Filebase
                                                type="file"
                                                multiple={false}
                                                onDone={({ base64 }) => setBox1({ ...box1, image: base64 })} />
                                            <TextField
                                                name='content'
                                                id="outlined-required"
                                                label="Content"
                                                value={box1.content}
                                                onChange={changeValue1}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <img style={{ objectFit: 'contain' }} src={box1.image} alt="Dog" height='60%' width='50%' />
                                            <p style={{ margin: '0px' }}>{box1.content}</p>
                                        </>
                                    )
                                }
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" onClick={addEntry1}>{box1.add ? 'Change' : 'Add'}</Button>
                                    <Button variant="contained" onClick={updateEntry1}>{box1.edit ? 'Change' : 'Update'}</Button>
                                    {
                                        (box1.add || box1.edit) && <Button variant="contained" onClick={cancelChange1}>Cancel</Button>
                                    }
                                </Stack>
                            </div>
                            <div style={{ backgroundColor: 'rgb(176,208,254)', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                {
                                    box2.add || box2.edit ? (
                                        <>
                                            <Filebase
                                                type="file"
                                                multiple={false}
                                                onDone={({ base64 }) => setBox2({ ...box2, image: base64 })} />
                                            <TextField
                                                name='content'
                                                id="outlined-required"
                                                label="Content"
                                                value={box2.content}
                                                onChange={changeValue2}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <img style={{ objectFit: 'contain' }} src={box2.image} alt="Cat" height='60%' width='50%' />
                                            <p style={{ margin: '0px' }}>{box2.content}</p>
                                        </>)
                                }
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" onClick={addEntry2}>{box2.add ? 'Change' : 'Add'}</Button>
                                    <Button variant="contained" onClick={updateEntry2}>{box2.edit ? 'Change' : 'Update'}</Button>
                                    {
                                        (box2.add || box2.edit) && <Button variant="contained" onClick={cancelChange2}>Cancel</Button>
                                    }
                                </Stack>
                            </div>
                        </Split>
                        <div style={{ backgroundColor: 'rgb(176,208,254)', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', padding: '0px' }}>
                            {
                                box3.add || box3.edit ? (
                                    <>
                                        <Filebase
                                            type="file"
                                            multiple={false}
                                            onDone={({ base64 }) => setBox3({ ...box3, image: base64 })} />
                                        <TextField
                                            name='content'
                                            id="outlined-required"
                                            label="Content"
                                            value={box3.content}
                                            onChange={changeValue3}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <img style={{ objectFit: 'contain' }} src={box3.image} alt="Lion" height='40%' width='50%' />
                                        <p style={{ margin: '0px' }}>{box3.content}</p>
                                    </>
                                )
                            }
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" onClick={addEntry3}>{box3.add ? 'Change' : 'Add'}</Button>
                                <Button variant="contained" onClick={updateEntry3}>{box3.edit ? 'Change' : 'Update'}</Button>
                                {
                                    (box3.add || box3.edit) && <Button variant="contained" onClick={cancelChange3}>Cancel</Button>
                                }
                            </Stack>
                        </div>
                    </Split>
                    <div ></div>
                </Split>
                <div ></div>
            </Split>
        </>
    )
}

export default SplitComponent
