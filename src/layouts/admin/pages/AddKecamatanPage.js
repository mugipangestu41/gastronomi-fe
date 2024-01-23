import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Grid, Container, Button, TextField, Stack, Input, FormLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


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

export default function AddKecamatanPage() {
  // const theme = useTheme();
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const formData = new FormData();
  const API_URL = process.env.REACT_APP_API
  
  const [uploadProgress, setUploadProgress] = useState(null)
  const [errCreate, setErrCreate] = useState('')
  const [kecamatans, setKecamatan] = useState(null)
  const [contents, setContent] = useState('')

  // const testVal = "http://localhost:3001/photos/0.png_1693883284382.png"
  const onFileChange = async (event)=> {    
    formData.append("files", event.target.files[0]);
  };

  const handleUpload = async () => {
    // e.preventDefault();
    try {
        const headers = {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        await axios.post(`${API_URL}kecamatan/createOneKecamatan`,
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
          setErrCreate(`Success data kecamatan ${kecamatans} ditambahkan`)
          // window.alert(`Success data kecamatan ${kecamatans} ditambahkan`)
          setKecamatan(null)
          setContent('')
          formData.delete("files")
          formData.delete("kecamatan")
          formData.delete("content")
          document.getElementById("myform").reset();
            navigate('/admin/addKecamatanPage')

        })
        .catch((e) => {
          console.log(e?.response?.data?.messages)
          setErrCreate(e?.response?.data?.messages)
          setKecamatan(null)
          setContent('')
          formData.delete("files")
          formData.delete("kecamatan")
          formData.delete("content")
          document.getElementById("myform").reset();
          // window.alert(`Error`)
          // window.location.reload()
          // console.log("error", err.response.data)
        })
        
        
    } catch (err) {
      window.alert(`Error`)
      console.log(err);
      navigate('/admin/addKecamatanPage')
    }
  };

  const handleSubmit = async () => {
    
    try {
      console.log(formData.get("files"))
      if(kecamatans == null){
        formData.delete("files")
        formData.delete("kecamatan")
        formData.delete("content")
        setErrCreate("Kolom kecamatan wajib di isi")
        setKecamatan(null)
        setContent('')
        document.getElementById("myform").reset();
      } else if(formData.get("files") == null){
        formData.delete("files")
        formData.delete("kecamatan")
        formData.delete("content")
        setErrCreate("Kolom file wajib di isi")
        setKecamatan(null)
        setContent('')
        document.getElementById("myform").reset();
      }
      else {
        setUploadProgress(null)
        formData.append("kecamatan", kecamatans)
        formData.append("content", contents)
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
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Detail Kecamatan </title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      {/* {
        console.log(test2)
      } */}
      <Container maxWidth="md"> 
        <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
        <p><a href='/admin'>Kecamatan</a> &#129058; <a style={{color:"black"}}>Tambah Kecamatan</a></p>
        </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <h5>{errCreate}</h5>
            <h3>Tambah Kecamatan</h3>
            <form id='myform'>
            <Stack spacing={2} m={2}>
              
              <div className="form-group">
              <TextField id="kecamatan" label="Kecamatan" variant="outlined" onChange={(e) => setKecamatan(e.target.value)} fullWidth required/>
              </div>

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
              <div className="form-group">
              <FormLabel style={{color:"black"}}>Image 2 </FormLabel>
                  <Input type="file" name="image2" onChange={onFileChange} required/>
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
