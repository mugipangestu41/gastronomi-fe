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

export default function EditMenuMakananPage() {
  // const theme = useTheme();
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const formData = new FormData();
  const formData2 = new FormData();

  const [uploadProgress, setUploadProgress] = useState(null)
  const [uploadProgress2, setUploadProgress2] = useState(null)
  const [errCreate, setErrCreate] = useState('')
  const [errCreateImage1, setErrCreateImage1] = useState('')
  const [errCreateImage2, setErrCreateImage2] = useState('')
  // const [detailMenuMakanan, setDetailMenuMakanan] = useState([])
  const [image1, setImage1] = useState('')
  const [tempImage1, setTempImage1] = useState()
  const [tempImage2, setTempImage2] = useState()
  const [image2, setImage2] = useState('')
  const [contents, setContent] = useState('')
  const wId = window.location.pathname.split('/')[3].includes('%20') ? window.location.pathname.split('/')[3].replaceAll('%20', ' ') : window.location.pathname.split('/')[3]
  // const testVal = "http://localhost:3001/photos/0.png_1693883284382.png"
  const onFileChange = async (event) => { 
    setTempImage1()
    formData.append("files", event.target.files[0])
    // console.log(URL.createObjectURL(formData.get("files")))
    setTempImage1(event.target.files[0])
   
  };

  const onFileChange2 = async (event) => { 
    setTempImage2()
    formData.append("files", event.target.files[0])
    // console.log(URL.createObjectURL(formData.get("files")))
    setTempImage2(event.target.files[0])
   
  };

  const API_URL = process.env.REACT_APP_API
  const BACKEND_API = process.env.REACT_APP_BE
  const headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
  const [nama_makanans, setNamaMakanan] = useState('')
  const [alamat_makanans, setAlamatMakanan] = useState('')
  const [rumahMakans, setRumahMakan] = useState('')
  const [id_rumah_makans, setIdRumahMakan] = useState('')

  const getDetailMenuMakanan = async () => {
    try {
      await axios.get(`${API_URL}join/makananById?id_makanan=${wId}`, {headers})
      .then(({data}) => {
        // setDetailMenuMakanan(data?.data[0])
        setNamaMakanan(data?.data[0]?.nama_makanan)
        setAlamatMakanan(data?.data[0]?.alamat_rumah_makan)
        setRumahMakan(data?.data[0]?.nama_rumah_makan)
        setContent(data?.data[0]?.content)
        setImage1(data?.data[0]?.image1)
        setImage2(data?.data[0]?.image2)
        setIdRumahMakan(data?.data[0]?.id_rumah_makan)
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
        await axios.put(`${API_URL}kudapan/updateMenuById?id=${wId}`,
        {
          nama_makanan: nama_makanans,
          content: contents,
          id_rumah_makan: id_rumah_makans
        }, {headers})
        .then(() => {
          setErrCreate(`Success data menu makanan ${nama_makanans} berhasil di edit`)
          navigate(`/admin/editMenuMakanan/${wId}`)

        })
        .catch((e) => {
          console.log(e?.response?.data?.messages)
          setErrCreate(e?.response?.data?.messages)
        })
        
        
    } catch (err) {
      window.alert(`Error`)
      console.log(err);
      navigate('/admin/menuMakanan')
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

  const handleImage2 = async () => {
    try {
      formData2.append("files", tempImage2)
      if(formData2.get("files") == null){
        formData2.delete("files")
        setErrCreateImage2("Kolom file wajib di isi")
      }
      else {
        setUploadProgress2(null)
        handleUploadImage2()
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
        await axios.put(`${API_URL}kudapan/updateImage1ById?id=${wId}`,
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
          setErrCreateImage1(`Success data image 1 berhasil diubah`)
          // window.alert(`Success data menuMakanan ditambahkan`)
          formData.delete("files")
          navigate(`/admin/editMenuMakanan/${wId}`)

        })
        .catch((e) => {
          setErrCreateImage1(e?.response?.data?.messages)
          formData.delete("files")
        })
        
        
    } catch (err) {
      window.alert(`Error`)
      console.log(err);
      navigate(`/admin/editMenuMakanan/${wId}`)
    }
  };

  const handleUploadImage2 = async () => {
    // e.preventDefault();
    try {
        const headers = {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        await axios.put(`${API_URL}kudapan/updateImage2ById?id=${wId}`,
        formData2, {headers, 
          onUploadProgress:(progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total)*100);
            console.log(`percentage upload ${percentCompleted}%`) 
            setUploadProgress2(percentCompleted)
            if (percentCompleted === 100) {
              console.log("Upload Complete!")
            }
          }
        })
        .then(() => {
          setErrCreateImage2(`Success data image 2 berhasil diubah`)
          // window.alert(`Success data menuMakanan ditambahkan`)
          formData2.delete("files")
          navigate(`/admin/editMenuMakanan/${wId}`)

        })
        .catch((e) => {
          setErrCreateImage2(e?.response?.data?.messages)
          formData2.delete("files")
        })
        
        
    } catch (err) {
      window.alert(`Error`)
      console.log(err);
      navigate(`/admin/editMenuMakanan/${wId}`)
    }
  };

  useEffect(() => {
    getDetailMenuMakanan()
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
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Detail MenuMakanan </title>
      </Helmet>
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
          &nbsp;<a style={{color:"black"}}>Edit Menu Makanan</a> 
          </p>
        </Grid>
        :
        <></>
        }
          <Grid item xs={12} sm={12} md={12}>
            <h5>{errCreate}</h5>
            <h1>Edit Menu Makanan</h1>
            <form id='myform'>
            <Stack spacing={2} m={2}>
              
              <div className="form-group">
              <TextField id="nama_makanan" label="Nama Menu Makanan" value={nama_makanans !== undefined && nama_makanans !== null ? nama_makanans : ''} variant="outlined" focused onChange={(e) => setNamaMakanan(e.target.value)} fullWidth required/>
              </div>

              <div className="form-group">
              <TextField disabled id="rumah_makan" label="Rumah Makan" value={rumahMakans !== undefined && rumahMakans !== null ? rumahMakans : ''} variant="outlined" focused fullWidth/>
              </div>

              <div className="form-group">
              <TextField disabled id="alamat_makanan" label="Alamat Rumah Makan" value={alamat_makanans !== undefined && alamat_makanans !== null ? alamat_makanans : ''} variant="outlined" focused fullWidth/>
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
              <FormLabel style={{color:"black", fontWeight:"bold"}}>Image 1 </FormLabel>
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
                  <h5>Upload Percentage {uploadProgress}%</h5>
                  :
                  <></>
                }
              <h5>{errCreateImage1}</h5>
                  <FormLabel style={{color:"black"}}>Image 1 </FormLabel>
                  <Input accept="image/*" type="file" name="image1" onChange={onFileChange} required/>
                  <Button onClick={handleImage1} variant='contained' fullWidth>Upload</Button>
              </div>
              <Divider style={{marginBottom:"20px"}}/>
      
      
              <div className='form-group'>
              <FormLabel style={{color:"black"}}>Image 2 </FormLabel>
                {/* <img src={`${BACKEND_API}${image2}`} alt="asd" height={200} /> */}
                {
                tempImage2 !== undefined ?
                <img src={URL.createObjectURL(tempImage2)} alt="asd" height={200} />

                :
                <img src={`${BACKEND_API}${image2}`} alt="asd" height={200} />
              }
              </div>
              <div className="form-group">
              {
                  uploadProgress2 !== null ? 
                  <h5>Upload Percentage {uploadProgress2}%</h5>
                  :
                  <></>
                }
              <h5>{errCreateImage2}</h5>
              <FormLabel style={{color:"black", fontWeight:"bold"}}>Image 2 </FormLabel>
                  <Input type="file" name="image2" onChange={onFileChange2} required/>
                  <Button onClick={handleImage2} variant='contained' fullWidth>Upload</Button>
              </div>
             
              
              </Stack>
             
            </form>
            
        </Grid>

      

         

        
         


        
        </Grid>
      </Container>
    </>
  );
}
