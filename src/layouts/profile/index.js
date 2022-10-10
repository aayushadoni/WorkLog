
import React, { useState , useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import {BallTriangle } from 'react-loader-spinner';
import Button from "react-bootstrap/Button";
// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import axios from "axios";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput"
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import {Container,Row,Col} from 'react-bootstrap'
import Card from "@mui/material/Card";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Logout } from "@mui/icons-material";
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Overview page components
const token = localStorage.getItem('jwt');
const id  = localStorage.getItem('id');
const status = localStorage.getItem('status');

const url = "https://work-log-backend.herokuapp.com";


function Overview() {
  const [loading,setloading] = useState(false)
  const [fullName,setName] = useState('');
  const [show, setShow] = useState(false);
  const [email, setemail] = useState('');
  const  [password, setpassword] = useState('');
  const [repassword, setrepassword] = useState('');
  const [department, setdepartment] = useState('');
  const [dateofjoining, setdateofjoining] = useState('');
  const [contact, setcontact] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getDataAdmin = () =>{
    axios.get(`${url}/admin/view/${id}`,{
      headers: { Authorization  : `Bearer ${token}` },
    })
    .then((res) => {
      if (res.data.success == true) {
        setName(res.data.data.username);
        setemail(res.data.data.email)
      } else alert("Error in adding category");
    })
    .catch((err) => {
      console.log("Error " + err);
    });
  }
  const getDataEmployee= () =>{
    axios.get(`${url}/employee/view/${id}`,{
      headers: { Authorization  : `Bearer ${token}` },
    })
    .then((res) => {
      if (res.data.success == true) {
        setName(res.data.data.username);
        setemail(res.data.data.email);
        setdepartment(res.data.data.department);
        setcontact(res.data.data.contactNumber);

      } else alert("Error in adding category");
    })
    .catch((err) => {
      console.log("Error " + err);
    });
  }


  const Logout = ()=>{
    localStorage.removeItem('jwt');
    localStorage.removeItem('id');
    window.location = "/authentication/sign-in";
  }  
  const Submit = () => {
    setShow(false);
    if(password===repassword) {
      axios
      .put(`${url}/employee/change/${id}`, {
        password:password
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success == true) {
          alert("password  updated successful");
          window.location.reload();
          window.location.reload();
        } else alert("error in  adding user");
      })
      .catch((err) => {
        console.log("Error " + err);
      });
    }
    else{
      alert('Password doesnot match')
    }
    
  };
  useEffect(() => {
    setloading(true);
    if(status === 'Admin')
    {
     getDataAdmin();
    }
    else{
      getDataEmployee();
    }
    setTimeout(() => {
     setloading(false);
    },1500)
               },[]);
  if(token)
  {
    if(status === 'Admin')
   { return (
     <div>
       {loading ? (
         <div
           style={{ height: "100vh", backgroundColor: "rgba(0,0,0,0.99" }}
           className="w-100 border d-flex justify-content-center align-items-center text-center"
         >
           <BallTriangle height="100" width="100" color="#e39a09" ariaLabel="loading" />
         </div>
       ) : (
         <DashboardLayout>
           <DashboardNavbar />
           
           
           <Card>
           <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={3}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography display="block" variant="button" color="white" my={1}>
                Profile
              </MDTypography>
              </MDBox>
        <MDBox pt={4} pb={3} px={3}>
        <Container
             className="p-5 d-flex justify-content-center align-items-center
"
           >
             <Row
               mx={1}
               my={1}
               py={3}
               px={2}
               className="d-flex justify-content-center align-items-center"
             >
               <Col className="col-12 p-2 d-flex justify-content-center align-items-center">
                 <h5>
                   {" "}
                   Name: <span clasName="text-secondary">{fullName}</span>
                 </h5>
               </Col>
               <Col className="col-12 p-2 d-flex justify-content-center align-items-center">
                 <h5>
                   {" "}
                   Email: <span clasName="text-secondary ">{email}</span>
                 </h5>
               </Col>
             </Row>
           </Container>
        </MDBox>
      </Card>
           <Footer />
         </DashboardLayout>
       )}
     </div>
   );}
  else
    {return (
      <div>
        {loading ? (
          <div
            style={{ height: "100vh", backgroundColor: "rgba(0,0,0,0.99" }}
            className="w-100 border d-flex justify-content-center align-items-center text-center"
          >
            <BallTriangle height="100" width="100" color="#e39a09" ariaLabel="loading" />
          </div>
        ) : (
          <DashboardLayout>
            <DashboardNavbar />
            <Card>

            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={2}
              mt={3}
              p={3}
              mb={1}
              textAlign="center"
            >
              <MDTypography display="block" variant="button" color="white" my={1}>
                Profile
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
           
            <Container
              className="p-5 d-flex justify-content-center align-items-center
"
            >
              <Row
                mx={1}
                my={1}
                py={3}
                px={2}
                className="d-flex justify-content-center align-items-center"
              >
                <Col className="col-12 p-2 d-flex justify-content-center align-items-center ">
                  <h5>
                    {" "}
                    Name: <span clasName="text-secondary">{fullName}</span>
                  </h5>
                </Col>
                <Col className="col-12 p-2 d-flex justify-content-center align-items-center">
                  <h5>
                    {" "}
                    Email: <span clasName="text-secondary ">{email}</span>
                  </h5>
                </Col>
                <Col className="col-12 p-2 d-flex justify-content-center align-items-center">
                  <h5>
                    {" "}
                    Department: <span clasName="text-secondary ">{department}</span>
                  </h5>
                </Col>
                <Col className="col-12 p-2 d-flex justify-content-center align-items-center">
                  <h5>
                    {" "}
                    Contact Number: <span clasName="text-secondary ">{contact}</span>
                  </h5>
                </Col>
                <MDButton
              size="medium"
              variant="outlined"
              color="dark"
              fontWeight="medium"
              className="my-5 mx-5"
              textGradient
              onClick={handleShow}
            >
              Change Password
            </MDButton>
              </Row>
            </Container>
            <Modal
              show={show}
              onHide={handleClose}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Enter Teask Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    onChange={(e) => setpassword(e.target.value)}
                    label="Enter New password"
                    variant="standard"
                    fullWidth
                  />
                </MDBox>    
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    onChange={(e) => setrepassword(e.target.value)}
                    label="Re-enter password"
                    variant="standard"
                    fullWidth
                  />
                </MDBox>    
              </Modal.Body>

              <Modal.Footer>
                <Button variant="primary" onClick={Submit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            </MDBox>
            </Card>

            <Footer />
          </DashboardLayout>
        )}
      </div>
    );}

}
  else
  {
    return( window.location = '/employeeSignin'
    )
  }
}

export default Overview;
