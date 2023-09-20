import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Grid, Container, Button, TextField, Stack, Input, FormLabel, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
/* eslint-disable camelcase */

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

export default function EditBerandaPage() {
  // const theme = useTheme();
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const formData = new FormData();

  const [uploadProgress, setUploadProgress] = useState(null)
  const [errCreate, setErrCreate] = useState('')
  const [errCreateImage1, setErrCreateImage1] = useState('')
  // const [detailBeranda, setDetailBeranda] = useState([])
  const [image1, setImage1] = useState('')
  const [tempImage1, setTempImage1] = useState()
  const [juduls, setJudul] = useState('')
  const [subJuduls, setSubJudul] = useState('')
  const [contents, setContent] = useState('')
  // const testVal = "http://localhost:3001/photos/0.png_1693883284382.png"
  const onFileChange = async (event) => { 
    setTempImage1()
    formData.append("files", event.target.files[0])
    // console.log(URL.createObjectURL(formData.get("files")))
    setTempImage1(event.target.files[0])
   
  };

  const API_URL = process.env.REACT_APP_API
  const BACKEND_API = process.env.REACT_APP_BE
  const headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}

  const getDetailBeranda = async () => {
    try {
      await axios.get(`${API_URL}beranda/allBeranda`, {headers})
      .then(({data}) => {
        // setDetailBeranda(data?.data[0])
        setJudul(data?.data[0]?.judul)
        setSubJudul(data?.data[0]?.sub_judul)
        setContent(data?.data[0]?.content)
        setImage1(data?.data[0]?.image1)
      })
      .catch((err) =>
      {if(err.response.status === 401){
        localStorage.clear();
        window.location.reload() 
        console.log("auth failed")
      }})
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async () => {
    // e.preventDefault();
    try {
        const headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        await axios.put(`${API_URL}beranda/edit`,
        {
          judul: juduls,
          sub_judul: subJuduls,
          content: contents
        }, {headers})
        .then(({data}) => {
          console.log(data)
          setErrCreate(`Success data beranda diedit`)
          navigate(`/admin/beranda`)

        })
        .catch((e) => {
          console.log(e?.response?.data?.messages)
          setErrCreate(e?.response?.data?.messages)
        })
        
        
    } catch (err) {
      window.alert(`Error`)
      console.log(err);
      navigate('/admin/beranda')
    }
  };

  const handleImage1 = async () => {
    try {
      formData.append("files", tempImage1)
      if(formData.get("files") == null){
        formData.delete("files")
        setErrCreateImage1("Kolom file wajib di isi")
      }
      else {
        setUploadProgress(null)
        handleUploadImage1()
      }
    } catch (err) {
      window.alert(`Error2`)
      console.log(err);
    }
  };

 

  const handleUploadImage1 = async () => {
    // e.preventDefault();
    try {
        const headers = {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        await axios.put(`${API_URL}beranda/updateImage1ById`,
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
        .then(({data}) => {
          console.log(data)
          setErrCreateImage1(`Success data image berhasil diubah`)
          // window.alert(`Success data beranda ${berandas} ditambahkan`)
          formData.delete("files")
          navigate(`/admin/beranda`)

        })
        .catch((e) => {
          setErrCreateImage1(e?.response?.data?.messages)
          formData.delete("files")
        })
        
        
    } catch (err) {
      window.alert(`Error`)
      console.log(err);
      navigate(`/admin/beranda`)
    }
  };

  useEffect(() => {
    getDetailBeranda()
    if(localStorage.getItem("token") == null) { 
      navigate("/login")
      window.location.reload()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <title> Gastronita | Detail Beranda </title>
      </Helmet>
      <Container maxWidth="md"> 
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <h5>{errCreate}</h5>
            <h1>Edit Beranda</h1>
            <form id='myform'>
            <Stack spacing={2} m={2}>
              
              <div className="form-group">
              <TextField id="judul" label="Judul" value={juduls !== undefined && juduls !== null ? juduls : ''} variant="outlined" focused onChange={(e) => setJudul(e.target.value)} fullWidth required/>
              </div>

              <div className="form-group">
              <TextField id="sub_judul" label="Sub Judul" value={subJuduls !== undefined && subJuduls !== null ? subJuduls : ''} variant="outlined" focused onChange={(e) => setSubJudul(e.target.value)} fullWidth required/>
              </div>

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
              <Button onClick={handleEdit} variant='contained'>Submit</Button>
              <Divider style={{marginBottom:"20px"}}/>

              <div className='form-group'>
              <FormLabel style={{color:"black", fontWeight:"bold"}}>Image</FormLabel>
              {
                tempImage1 !== undefined ?
                <img src={URL.createObjectURL(tempImage1)} alt="asd" height={200} />

                :
                <img src={`${BACKEND_API}${image1}`} alt="asd" height={200} />
              }
              </div>


              <div className="form-group">
              {
                  uploadProgress !== null ? 
                  <h5 style={{marginBottom: "-20px"}}>Upload Percentage {uploadProgress}%</h5>
                  :
                  <></>
                }
              <h5>{errCreateImage1}</h5>
                  <FormLabel style={{color:"black"}}>Image </FormLabel>
                  <Input accept="image/*" type="file" name="image1" onChange={onFileChange} required/>
                  <Button onClick={handleImage1} variant='contained' fullWidth>Upload</Button>
              </div>
              <Divider style={{marginBottom:"20px"}}/>
      

              
              </Stack>
             
            </form>
            
        </Grid>

      

         

        
         


        
        </Grid>
      </Container>
    </>
  );
}
