
import { Link } from "react-router-dom";
import { BallTriangle } from 'react-loader-spinner';
import React, { useState,useEffect } from 'react';
import axios from "axios";

import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  const [loading,setloading] = useState(false)

  const url = "http://localhost:8000";

  const [username,setName] = useState('');
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('');
  const token = localStorage.getItem('jwt'); 
  const Submit = ()=>{
    axios.post(`${url}/admin/`, {
      username: username,
      email: email,
      password:password
    })
    .then((res) => {
      console.log(res.data.success);
      if (res.data.success == true) {
          alert("User added successfully");
          window.location= "/dashboard"
      } else alert("Error in adding category");
    })
    .catch((err) => {
      console.log("Error " + err);
    });
  }
   
  useEffect(() => {
    setloading(true);
    setTimeout(() => {
     setloading(false);
    },1500)
               },[]);
               
  if(token)
  {
    return (
      <div>
        {
          loading ? (
            <div style={{height: "100vh",backgroundColor:"rgba(0,0,0,0.99"}}className='w-100 border d-flex justify-content-center align-items-center text-center'>
            <BallTriangle
            height="100"
            width="100"
            color='#e39a09'
            ariaLabel='loading'
            />
            </div>  
          ) : (
            <CoverLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography display="block" variant="button" color="white" my={1}>
              Enter your email and password to Add Admin
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput type="text" onChange={e=>setName(e.target.value)} label="Name" variant="standard" fullWidth />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="email" label="Email"onChange={e=>setemail(e.target.value)} variant="standard" fullWidth />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="password" label="Password" onChange={e=>setpassword(e.target.value)} variant="standard" fullWidth />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" onClick = {e=>Submit()} fullWidth>
                  Add Admin
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </CoverLayout>
          )
        }
      </div>
      
    );
  }
  else{
    return(
      <div>Please login</div>
    )
  }
}

export default Cover;
