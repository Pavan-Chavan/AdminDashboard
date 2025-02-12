import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";
import EmailVerify from "../email-verify/EmailVerify";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    mobile:"",
    role: "user",
    password:"",
    confirmPassword : ""
  });
  const navigate = useNavigate();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [condtion, setCondtion] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if(name === "password") {
      if (value === formData.confirmPassword) {
        setPasswordsMatch(true);  // Passwords match
      } else {
        setPasswordsMatch(false); // Passwords don't match
      }
    }

    if(name === "confirmPassword") {
      if (value === formData.password) {
        setPasswordsMatch(true);  // Passwords match
      } else {
        setPasswordsMatch(false); // Passwords don't match
      }
    }

    if(name === "email" && isOtpVerified) {
      setIsOtpVerified(false);
    }

    setFormData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
        const response = await axios.post(`${api}/api/user/create-users`, formData); 
        if (response.data.result !== 0) {
            // showAlert('expenses added');
            setFormData({
              name:"",
              email:"",
              mobile:"",
              password:""
            });
            navigate("/login");
        } else {
          // window.alert("Something went wrong");  
          showAlert('something went wrong', 'danger');
        }
    } catch (error) {
        showAlert(error.response.data.error, 'danger');
        console.error('Error:', error);
    }
  };  

  const handleSignUpWithGoogle = () => {
    window.open(`${api}/auth/google?type=signup`, '_self');
  }

  return (
    <div className="row y-gap-20" >
      <div className="col-12">
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10">
          Already have an account yet?{" "}
          <Link to="/login" className="text-blue-1">
            Log in
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" name="name" onChange={handleChange} required value={formData.name}/>
          <label className="lh-1 text-14 text-light-1">Full Name</label>
        </div>
      </div>
      {/* End .col */}
      {/* End .col */}

      <EmailVerify handleChange={handleChange} formData={formData} setIsOtpVerified={setIsOtpVerified}/>

      {/* End .col */}
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" name="mobile" onChange={handleChange} required value={formData.mobile}/>
          <label className="lh-1 text-14 text-light-1">Mobile No</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="password" onChange={handleChange} name="password" value={formData.password} required />
          <label className="lh-1 text-14 text-light-1">Password</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="password" onChange={handleChange} name="confirmPassword" value={formData.confirmPassword} required />
          <label className="lh-1 text-14 text-light-1">Confirm Password</label>
        </div>
        {!passwordsMatch && <div className="text-15 lh-15 text-light-1 ml-10">
          Password must be same.
        </div>}
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="d-flex ">
          <div className="form-checkbox mt-5">
            <input type="checkbox" onChange={(e)=>{setCondtion(e.target.checked)}} name="condition" value={condtion}/>
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
          </div>
          <div className="text-15 lh-15 text-light-1 ml-10">
            Email me exclusive WedEazzy offers. I can opt out later as stated
            in the Privacy Policy.
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <button
          type="submit"
          href="#"
          onClick={handleSubmit}
          disabled={!(passwordsMatch && condtion && isOtpVerified)}
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          Sign Up <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      <div className="col-12 ">
      <div className="text-center px-30">
        <p>
        or sign in with
        </p>
        </div>
      </div>
      <div className="col-12">
        <button
          type="submit"
          href="#"
          onClick={handleSignUpWithGoogle}
          className="button col-12 -outline-red-1 text-red-1 py-15 rounded-8 "
        >
          Google <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {/* End .col */}
    </div>
  );
};

export default SignUpForm;
