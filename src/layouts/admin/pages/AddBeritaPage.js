import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Grid, Container, Button, TextField, Stack, Input, FormLabel, Typography, InputLabel, Select, MenuItem, FormGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import dayjs from 'dayjs';

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// components
// import Iconify from '../components/iconify';
// // sections
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppWidgetSummary,
//   AppCurrentSubject,
//   AppConversionRates,
// } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function AddBeritaPage() {
  // const theme = useTheme();
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const formData = new FormData();
  const API_URL = process.env.REACT_APP_API
  
  const [uploadProgress, setUploadProgress] = useState(null)
  const [errCreate, setErrCreate] = useState('')
  const [beritas, setBerita] = useState(null)
  const [contents, setContent] = useState('')
  const [penuliss, setPenulis] = useState('')
  const [tanggalBerita, setTanggalBerita] = useState(null)
  const [statuss, setStatus] = useState(1)
  // const testVal = "http://localhost:3001/photos/0.png_1693883284382.png"
  const onFileChange = async (event)=> {    
    formData.append("files", event.target.files[0]);
  };

  const handleUpload = async () => {
    // e.preventDefault();
    try {
        const headers = {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        await axios.post(`${API_URL}berita/createOneBerita`,
        formData, {headers, 
          onUploadProgress:(progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total)*100);
            console.log(`percentage upload ${percentCompleted}%`) 
            setUploadProgress(percentCompleted)
            if (percentCompleted === 100) {
              console.log("Upload Complete!")
            }
          }
        })
        .then(() => {
          setErrCreate(`Success data berita ${beritas} ditambahkan`)
          // window.alert(`Success data berita ${beritas} ditambahkan`)
          setBerita(null)
          setContent('')
          formData.delete("files")
          formData.delete("judul")
          formData.delete("content")
          formData.delete("penulis")
          formData.delete("tanggal_berita")
          formData.delete("status")
          document.getElementById("myform").reset();
            navigate('/admin/addBeritaPage')

        })
        .catch((e) => {
          console.log(e?.response?.data?.messages)
          setErrCreate(e?.response?.data?.messages)
          setBerita(null)
          setContent('')
          formData.delete("files")
          formData.delete("judul")
          formData.delete("content")
          formData.delete("penulis")
          formData.delete("tanggal_berita")
          formData.delete("status")
          document.getElementById("myform").reset();
          // window.alert(`Error`)
          // window.location.reload()
          // console.log("error", err.response.data)
        })
        
        
    } catch (err) {
      window.alert(`Error`)
      console.log(err);
      navigate('/admin/addBeritaPage')
    }
  };

  const handleSubmit = async () => {
    
    try {
      console.log(formData.get("files"))
      if(beritas === null || penuliss === ''|| contents === '' || tanggalBerita === null){
        formData.delete("files")
          formData.delete("judul")
          formData.delete("content")
          formData.delete("penulis")
          formData.delete("tanggal_berita")
          formData.delete("status")
        setErrCreate("Semua kolom berita wajib di isi")
        setBerita(null)
        setContent('')
        document.getElementById("myform").reset();
      } else if(formData.get("files") == null){
        formData.delete("files")
        formData.delete("judul")
        formData.delete("content")
        formData.delete("penulis")
        formData.delete("tanggal_berita")
        formData.delete("status")
        setErrCreate("Kolom file wajib di isi")
        setBerita(null)
        setContent('')
        document.getElementById("myform").reset();
      }
      else {
        setUploadProgress(null)
        formData.append("judul", beritas)
        formData.append("content", contents)
        formData.append("penulis", penuliss)
        formData.append("tanggal_berita", tanggalBerita)
        formData.append("status", statuss)
        handleUpload()
      }
        
        
    } catch (err) {
      window.alert(`Error2`)
      console.log(err);
    }
  };

  useEffect(() => {
    if(localStorage.getItem("token") == null) { 
      navigate("/login")
      window.location.reload()
    }
  })

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font"
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }]
    ]
  };

  const handleProcedureContentChange = (content) => {
    setContent(content);
  };
  return (
    <>
      <Helmet>
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Detail Berita </title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <Container maxWidth="md"> 
        <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
        <p><a href='/admin/berita'>Berita</a> &#129058; <a style={{color:"black"}}>Tambah Berita</a></p>
        </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <h5>{errCreate}</h5>
            <h3>Tambah Berita</h3>
            <form id='myform'>
            <Stack spacing={2} m={2}>
              
              <FormGroup>
              <TextField id="judul" label="Judul" variant="outlined" onChange={(e) => setBerita(e.target.value)} fullWidth required/>
              </FormGroup>

              <FormGroup>
              <TextField id="penulis" label="Penulis" variant="outlined" onChange={(e) => setPenulis(e.target.value)} fullWidth required/>
              </FormGroup>

              <FormGroup>
                <Typography variant='body2'>Tanggal Berita</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                // defaultValue={dayjs(new Date())}
                 fullWidth onChange={(e) => {setTanggalBerita(( new Date(e).toISOString().split('T')[0]))} }/>
              </LocalizationProvider>
              </FormGroup>

              <FormGroup>
                <InputLabel>Status</InputLabel>
                <Select fullWidth label="Status" value={statuss} onChange={(e) => {setStatus(e.target.value)}}>
                  <MenuItem value={1}>Published</MenuItem>
                  <MenuItem value={0}>Draft</MenuItem>
                </Select>
                </FormGroup>


              {/* <div className="form-group">
              <TextField id="content" label="Content" variant="outlined" onChange={(e) => setContent(e.target.value)} fullWidth required/>
              </div> */}

              <div className='form-group'>
                <FormLabel style={{color:"black"}}>Content</FormLabel>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={contents}
                required
                onChange={handleProcedureContentChange}
              />
              </div>

              <div className="form-group">
                  <FormLabel style={{color:"black"}}>Image 1 </FormLabel>
                  <Input type="file" name="image1" onChange={onFileChange} required/>
              </div>
             
              <div className='form-group'>
                {
                  uploadProgress !== null ? 
                  <h6>Upload Percentage {uploadProgress}%</h6>
                  :
                  <></>
                }
              </div>
              <Button onClick={handleSubmit} variant='contained'>Submit</Button>
              </Stack>
             
            </form>
            
        </Grid> 
        </Grid>
      </Container>
    </>
  );
}
