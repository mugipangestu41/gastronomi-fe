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

// ----------------------------------------------------------------------

export default function EditBerandaPage() {
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
  // const [detailBeranda, setDetailBeranda] = useState([])
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [tempImage1, setTempImage1] = useState()
  const [tempImage2, setTempImage2] = useState()
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

  const onFileChange2 = async (event) => { 
    setTempImage2()
    formData2.append("files", event.target.files[0])
    // console.log(URL.createObjectURL(formData.get("files")))
    setTempImage2(event.target.files[0])
   
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
        setImage2(data?.data[0]?.logo)
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
        .then(() => {
          localStorage.setItem("judul", juduls)
          setErrCreate(`Success data beranda di edit`)
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

  const handleImage2 = async () => {
    try {
      formData2.append("files", tempImage2)
      if(formData2.get("files") == null){
        formData2.delete("files")
        setErrCreateImage1("Kolom file wajib di isi")
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
        .then(() => {
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

  const handleUploadImage2 = async () => {
    // e.preventDefault();
    try {
        const headers = {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        await axios.put(`${API_URL}beranda/updateLogo`,
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
          setErrCreateImage2(`Success data logo berhasil diubah`)
          // window.alert(`Success data beranda ${berandas} ditambahkan`)
          formData2.delete("files")
          navigate(`/admin/beranda`)

        })
        .catch((e) => {
          setErrCreateImage2(e?.response?.data?.messages)
          formData2.delete("files")
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
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Detail Beranda </title>
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
                  <h5>Upload Percentage {uploadProgress}%</h5>
                  :
                  <></>
                }
              <h5>{errCreateImage1}</h5>
                  <FormLabel style={{color:"black"}}>Image </FormLabel>
                  <Input accept="image/*" type="file" name="image1" onChange={onFileChange} required/>
                  <Button onClick={handleImage1} variant='contained' fullWidth>Upload</Button>
              </div>
              <Divider style={{marginBottom:"20px"}}/>



              <div className='form-group'>
              <FormLabel style={{color:"black", fontWeight:"bold"}}>Logo</FormLabel>
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
                  <FormLabel style={{color:"black"}}>Logo </FormLabel>
                  <Input accept="image/*" type="file" name="logo" onChange={onFileChange2} required/>
                  <Button onClick={handleImage2} variant='contained' fullWidth>Upload</Button>
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
