import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Grid, Container, Button, TextField, Stack, Input, FormLabel, Divider, FormGroup, Typography, InputLabel, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
import moment from 'moment';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
/* eslint-disable camelcase */

// ----------------------------------------------------------------------

export default function EditBeritaPage() {
  // const theme = useTheme();
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const formData = new FormData();

  const [uploadProgress, setUploadProgress] = useState(null)
  const [errCreate, setErrCreate] = useState('')
  const [errCreateImage1, setErrCreateImage1] = useState('')
  const [beritas, setBerita] = useState(null)
  // const [detailBerita, setDetailBerita] = useState([])
  const [image1, setImage1] = useState('')
  const [tempImage1, setTempImage1] = useState()
  const [contents, setContent] = useState('')
  const [penuliss, setPenulis] = useState('')
  const [statuss, setStatus] = useState(0)
  const wKecmatan = window.location.pathname.split('/')[3].includes('%20') ? window.location.pathname.split('/')[3].replaceAll('%20', ' ') : window.location.pathname.split('/')[3]
  const wId = window.location.pathname.split('/')[4]
  
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
  const [tanggalBerita, setTanggalBerita] = useState(null)

  const getDetailBerita = async () => {
    try {
      await axios.get(`${API_URL}berita/beritaByIdAdmin?id=${wId}`, {headers})
      .then(({data}) => {
        // setDetailBerita(data?.data[0])
        setBerita(data?.data[0]?.judul)
        setContent(data?.data[0]?.content)
        setImage1(data?.data[0]?.image1)
        setPenulis(data?.data[0]?.penulis)
        setStatus(data?.data[0]?.status)
        setTanggalBerita(data?.data[0]?.tanggal_berita?.substring(0,10))
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
    try {
        const headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        await axios.put(`${API_URL}berita/edit?id=${wId}`,
        {
          tanggal_berita: tanggalBerita,
          content: contents,
          penulis: penuliss,
          status: statuss,
          judul: beritas
        }, {headers})
        .then(() => {
          setErrCreate(`Success data berita ${beritas} di edit`)
          navigate(`/admin/editBeritaPage/${beritas}/${wId}`)

        })
        .catch((e) => {
          console.log(e?.response?.data?.messages)
          setErrCreate(e?.response?.data?.messages)
        })
        
        
    } catch (err) {
      window.alert(`Error`)
      console.log(err);
      navigate('/admin/berita')
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
        await axios.put(`${API_URL}berita/updateImage1ById?id=${wId}`,
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
          setErrCreateImage1(`Success data image 1 ${beritas} berhasil diubah`)
          // window.alert(`Success data berita ${beritas} ditambahkan`)
          formData.delete("files")
          navigate(`/admin/editBeritaPage/${beritas}/${wId}`)

        })
        .catch((e) => {
          setErrCreateImage1(e?.response?.data?.messages)
          formData.delete("files")
        })
        
        
    } catch (err) {
      window.alert(`Error`)
      console.log(err);
      navigate(`/admin/editBeritaPage/${beritas}/${wId}`)
    }
  };


  useEffect(() => {
    localStorage.setItem("editBerita", window.location.pathname)
    getDetailBerita()
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
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Detail Berita </title>
      </Helmet>
      <Container maxWidth="md"> 
        <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
        <p><a href='/admin/berita'>Berita</a> &#129058; <a style={{color:"black"}}>Edit Berita</a></p>
        </Grid>
       
          <Grid item xs={12} sm={12} md={12}>
            <h5>{errCreate}</h5>
            <h1>Edit Berita {wKecmatan}</h1>
            <form id='myform'>
            <Stack spacing={2} m={2}>
              
              <FormGroup>
              <TextField id="berita" label="Judul" value={beritas !== undefined && beritas !== null ? beritas : ''} variant="outlined" focused onChange={(e) => setBerita(e.target.value)} fullWidth required/>
              </FormGroup>
              <FormGroup>
              <TextField id="penulis" label="Penulis" value={penuliss !== undefined && penuliss !== null ? penuliss : ''} variant="outlined" focused onChange={(e) => setPenulis(e.target.value)} fullWidth required/>
              </FormGroup>
              <FormGroup>
              <FormGroup>
                <InputLabel>Status</InputLabel>
                <Select fullWidth label="Status" value={statuss} onChange={(e) => {setStatus(e.target.value)}}>
                  <MenuItem value={1}>Published</MenuItem>
                  <MenuItem value={0}>Draft</MenuItem>
                </Select>
                </FormGroup>
              </FormGroup>
              <FormGroup>
                <Typography variant='body2'>Tanggal Berita: {tanggalBerita}</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                // defaultValue={dayjs(new Date(tanggalBerita?.substring(0,10)))}
                 fullWidth onChange={(e) => {setTanggalBerita((moment(new Date(e)).format('YYYY-MM-DD')))} }/>
              </LocalizationProvider>
              </FormGroup>

              <FormGroup>
              <FormLabel style={{color:"black"}}>Content</FormLabel>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={contents}
                required
                onChange={handleProcedureContentChange}
              />
             </FormGroup>
              <Button onClick={handleEdit} variant='contained'>Submit</Button>
              <Divider style={{marginBottom:"20px"}}/>

              <FormGroup>
              <FormLabel style={{color:"black", fontWeight:"bold"}}>Image 1 </FormLabel>
              {
                tempImage1 !== undefined ?
                <img src={URL.createObjectURL(tempImage1)} alt="asd" height={200} />

                :
                <img src={`${BACKEND_API}${image1}`} alt="asd" height={200} />
              }
              </FormGroup>


              <div className="form-group">
                {
                  uploadProgress !== null ? 
                  <h5 >Upload Percentage {uploadProgress}%</h5>
                  :
                  <></>
                }
              <h5>{errCreateImage1}</h5>
                  <FormLabel style={{color:"black"}}>Image 1 </FormLabel>
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
