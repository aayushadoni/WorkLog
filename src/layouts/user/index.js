import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Form } from "react-bootstrap";
import { BallTriangle } from "react-loader-spinner";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

const url = "https://work-log-backend.herokuapp.com";
const token = localStorage.getItem("jwt");

function Overview() {
  const [loading, setloading] = useState(false);
  const [username, setUsername] = useState("wd");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("ww");
  const [contactNumber, setcontactNumber] = useState("");
  const [joiningDate, setjoiningDate] = useState("");
  const [date1, setdate1] = useState("");
  const [department, setdepartment] = useState("");

  function getdate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }

  const dateConversion = (e) => {
    const v = getdate(e);
    setjoiningDate(v);
  };
  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 1500);
  }, []);

  const Submit = () => {
    axios
      .post(
        `${url}/employee/`,
        {
          username: username,
          email: email,
          password: password,
          contactNumber: contactNumber,
          department: department,
          joiningDate: joiningDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data.success);
        if (res.data.success == true) {
          alert("Employee added successful");
          window.location = "/user/seeUser";
        } else alert("error in  adding user");
      })
      .catch((err) => {
        console.log("Error " + err);
      });
  };
  if (token) {
    return (
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
                <h6>Add Employee </h6>
              </MDTypography>
            </MDBox>
            <MDBox mx={1} my={1} py={3} px={2}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  label="Enter Name"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={(e) => setemail(e.target.value)}
                  label="Enter Email"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                  label="Enter Password"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="Number"
                  onChange={(e) => setcontactNumber(e.target.value)}
                  label="Enter Mobile Number"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={(e) => setdepartment(e.target.value)}
                  label="Enter Department"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <h6
                  className="text-sm-left text-secondary"
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  Enter Joining Date
                </h6>
                <DatePicker
                  label="Date Picker"
                  dateFormat="dd/MM/yyyy"
                  selected={date1}
                  onChange={(date) => {
                    setdate1(date), dateConversion(date);
                  }}
                />
              </MDBox>

              <MDButton mb={2} textAlign="start" onClick={(e) => Submit()}>
                Submit
              </MDButton>
            </MDBox>

            <Footer />
          </DashboardLayout>
        )}
      </div>
    );
  } else {
    return window.location = '/employeeSignin';
  }
}

export default Overview;
