import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Grid, Container, Button, Stack, Input, FormLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



// ----------------------------------------------------------------------

export default function AddSliderPage() {
  // const theme = useTheme();
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const formData = new FormData();
  const API_URL = process.env.REACT_APP_API
  
  const [uploadProgress, setUploadProgress] = useState(null)
  const [errCreate, setErrCreate] = useState('')

  // const testVal = "http://localhost:3001/photos/0.png_1693883284382.png"
  const onFileChange = async (event)=> {    
    formData.append("files", event.target.files[0]);
  };

  const handleUpload = async () => {
    // e.preventDefault();
    try {
        const headers = {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        await axios.post(`${API_URL}slider/createOneSlider`,
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
          setErrCreate(`Success data slider ditambahkan`)
          // window.alert(`Success data slider ${sliders} ditambahkan`)
          formData.delete("files")
          document.getElementById("myform").reset();
            navigate('/admin/addSliderPage')

        })
        .catch((e) => {
          console.log(e?.response?.data?.messages)
          setErrCreate(e?.response?.data?.messages)
          formData.delete("files")
          document.getElementById("myform").reset();
          // window.alert(`Error`)
          // window.location.reload()
          // console.log("error", err.response.data)
        })
        
        
    } catch (err) {
      window.alert(`Error`)
      console.log(err);
      navigate('/admin/addSliderPage')
    }
  };

  const handleSubmit = async () => {
    
    try {
      console.log(formData.get("files"))
      if(formData.get("files") == null){
        formData.delete("files")

        setErrCreate("Kolom file wajib di isi")
        document.getElementById("myform").reset();
      }
      else {
        setUploadProgress(null)
  
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

  return (
    <>
      <Helmet>
        <title> Gastronita | Detail Slider </title>
      </Helmet>
      {/* {
        console.log(test2)
      } */}
      <Container maxWidth="md"> 
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <h5>{errCreate}</h5>
            <h1>Add Slider</h1>
            <form id='myform'>
            <Stack spacing={2} m={2}>
              
    
              <div className="form-group">
                  <FormLabel style={{color:"black"}}>Image</FormLabel>
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
