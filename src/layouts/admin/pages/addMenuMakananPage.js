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

export default function AddMenuMakananPage() {
  // const theme = useTheme();
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const formData = new FormData();
  const API_URL = process.env.REACT_APP_API
  
  const [uploadProgress, setUploadProgress] = useState(null)
  const [errCreate, setErrCreate] = useState('')
  const [menuMakanans, setMenuMakanan] = useState('')
  const [contents, setContent] = useState('')
  const wRumahMakan = window.location.pathname.split('/')[3].includes('%20') ? window.location.pathname.split('/')[3].replaceAll('%20', ' ') : window.location.pathname.split('/')[3]
  const wId = window.location.pathname.split('/')[4]
  // const testVal = "http://localhost:3001/photos/0.png_1693883284382.png"
  const onFileChange = async (event)=> {    
    formData.append("files", event.target.files[0]);
  };

  const handleUpload = async () => {
    // e.preventDefault();
    try {
        const headers = {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        await axios.post(`${API_URL}kudapan/createOneMenu`,
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
          setErrCreate(`Success data menuMakanan ${menuMakanans} ditambahkan`)
          // window.alert(`Success data menuMakanan ${menuMakanans} ditambahkan`)
          setMenuMakanan(null)
          setContent('')
          formData.delete("files")
          formData.delete("id_kecamatan")
          formData.delete("content")
          formData.delete("nama_makanan")
          document.getElementById("myform").reset();
            navigate(`/admin/addMenuMakananPage/${wRumahMakan}/${wId}`)

        })
        .catch((e) => {
          console.log(e?.response?.data?.messages)
          setErrCreate(e?.response?.data?.messages)
          setMenuMakanan(null)
          setContent('')
          formData.delete("files")
          formData.delete("id_kecamatan")
          formData.delete("content")
          formData.delete("nama_makanan")
          document.getElementById("myform").reset();
          // window.alert(`Error`)
          // window.location.reload()
          // console.log("error", err.response.data)
        })
        
        
    } catch (err) {
      window.alert(`Error`)
      console.log(err);
      navigate(`/admin/addMenuMakananPage/${wRumahMakan}/${wId}`)
    }
  };

  const handleSubmit = async () => {
    
    try {
      console.log(formData.get("files"))
      if(menuMakanans == null){
        formData.delete("files")
          formData.delete("id_kecamatan")
          formData.delete("content")
          formData.delete("nama_makanan")
        setErrCreate("Kolom menuMakanan wajib di isi")
        setMenuMakanan(null)
        setContent('')
        document.getElementById("myform").reset();
      } else if(formData.get("files") == null){
        formData.delete("files")
        formData.delete("id_kecamatan")
        formData.delete("content")
        formData.delete("nama_makanan")
        setErrCreate("Kolom file wajib di isi")
        setMenuMakanan(null)
        setContent('')
        document.getElementById("myform").reset();
      }
      else {
        setUploadProgress(null)
        formData.append("id_rumah_makan", wId)
        formData.append("content", contents)
        formData.append("nama_makanan", menuMakanans)
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
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Detail MenuMakanan </title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      {/* {
        console.log(test2)
      } */}
      <Container maxWidth="md"> 
        <Grid container spacing={3}>
        {
        localStorage.getItem('editKecamatan') !== null &&
        localStorage.getItem('rumahMakan') !== null &&
        localStorage.getItem('editRumahMakan') !== null ?
          
        <Grid item xs={12} sm={12} md={12}>
          <p><a href='/admin'>Kecamatan</a> &#129058;
          &nbsp;<a href={`${localStorage.getItem('editKecamatan')}`} >Edit Kecamatan</a> &#129058;
          &nbsp;<a href={`${localStorage.getItem('rumahMakan')}`} >Rumah Makan</a> &#129058;
          &nbsp;<a href={`${localStorage.getItem('editRumahMakan')}`} >Edit Rumah Makan</a> &#129058;
          &nbsp;<a href={`${localStorage.getItem('menuMakanan')}`} >Menu Makanan</a> &#129058;
          &nbsp;<a style={{color:"black"}}>Tambah Menu Makanan</a> 
          </p>
        </Grid>
        :
        <></>
        }
          <Grid item xs={12} sm={12} md={12}>
            <h5>{errCreate}</h5>
            <h3>Tambah Menu Makanan di {wRumahMakan}</h3>
            <form id='myform'>
            <Stack spacing={2} m={2}>
              
              <div className="form-group">
              <TextField id="menuMakanan" label="Nama Menu Makanan" variant="outlined" onChange={(e) => setMenuMakanan(e.target.value)} fullWidth required/>
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
