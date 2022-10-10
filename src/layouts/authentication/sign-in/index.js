import { useState } from "react";
import axios from "axios";
// react-router-dom components
import { Link } from "react-router-dom";
import Modal from 'react-modal';

// @mui material components
import Card from "@mui/material/Card";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const url = "http://localhost:8000";
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('');
   
  const Submit = ()=>{
    axios.post(`${url}/admin/loginuser`, {
      email: email,
      password:password
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.success == true) {
        if(res.data.token)
        {
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("id", res.data._id);
          localStorage.setItem("status","Admin");
          window.location= "/user/seeUser"
        }
        else{
          alert("Login Again")
        }
      } else console.log("Error");
    })
    .catch((err) => {
      alert("Login Again")
      location.reload()
      console.log("Error " + err);
    });
  }
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" onChange={e=>(setemail(e.target.value))} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" onChange={e=>{setpassword(e.target.value)}} fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick ={()=>{Submit()}} fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
  
                <MDTypography
                  component={Link}
                  to="/employeeSignin"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Employee Login
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
