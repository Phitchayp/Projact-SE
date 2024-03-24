import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useState, useEffect } from 'react';
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Google = () => {
  const clientId = "903970944042-27p6mntuucj32e4nftg2v0ob9k5q2807.apps.googleusercontent.com"
  const [error, setError] = useState('');
  const nav = useNavigate();
  
  const responseGoogle = (response) => {
    console.log('Response from Google:', response);
    
    // const userEmail = response.profileObj.email;
    axios.get(`http://localhost:3001/checkUserRole?emailUser=${response.profileObj.email}`)
      .then(res => {
        sessionStorage.setItem("role", res.data.role)
        sessionStorage.setItem("email", res.data.email)
        sessionStorage.setItem("name", res.data.fullname)
        // if (err) throw err;
        if (res.data.role === 'admin') {
          console.log("ADMIN")
          nav("/AdminNoti");
          window.location.reload()
        } else if (res.data.role === 'edu') {
          console.log("EDU")
          nav("/EduNoti");
          window.location.reload()
        } else if (res.data.role === 'teacher') {
          console.log("Teacher")
          nav("/TeacherNoti");
          window.location.reload()
        } else {
          setError('User not found in the database.');
          // res.status(404).json({ error: 'User not found' }); // You don't need to handle status here
        }
      })
      .catch(err => {
        setError(err.response.data.error);
        // alert(`${err}`)
      });

    
    }

    return (
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    );
  };
  export default Google;