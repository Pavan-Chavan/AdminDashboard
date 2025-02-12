import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { api } from "@/utils/apiProvider";
import { showAlert } from "@/utils/isTextMatched";

const LoginForm = ({role}) => {
  const state = useLocation()?.state || null;
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${api}/api/auth/login`, 
          {...formData,
            role: role
          }); 
        if (response.status === 200) {
            // showAlert('expenses added');
            setFormData({
              password:"",
              email:"",
            });
            localStorage.setItem(`${role}Id`,response.data.userDate.user_id);
            localStorage.setItem("role",response.data.userDate.role);
            localStorage.setItem("user-image",response.data.userDate.image);
            localStorage.setItem("username",response.data.userDate.name);
            if (state !== null && state.type !== null && state.id !== null) {
              navigate(`/${state.type}/${state.id}`)
            } else {
              role === "admin" ? navigate("/admin-dashboard/dashboard") : navigate("/");
            }
        } else {
          // window.alert("Something went wrong : " , response.data.error);  
          showAlert("Something went wrong.", "danger");
        }
    } catch (error) {
        showAlert(error?.response?.data?.error, "danger");  
        console.error('Error:', error);
    }
  };

  const handleSignUpWithGoogle = () => {
    window.open(`${api}/auth/google?type=signup`, '_self');
  }

  return (
    <div className="row y-gap-20">
      <div className="col-12">
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10">
          Don&apos;t have an account yet?{" "}
          <Link to="/signup" className="text-blue-1">
            Sign up for free
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" name="email" required onChange={handleChange} value={formData.email}/>
          <label className="lh-1 text-14 text-light-1" >Email</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="password" required name="password" onChange={handleChange} value={formData.password}/>
          <label className="lh-1 text-14 text-light-1">Password</label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <a href="#" className="text-14 fw-500 text-blue-1 underline">
          Forgot your password?
        </a>
      </div>
      {/* End .col */}

      <div className="col-12">
        <button
          type="submit"
          onClick={handleSubmit}
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
        >
          Sign In <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>
      {role === "user" && <div className="col-12">
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
      </div>}
      {/* End .col */}
    </div>
  );
};

export default LoginForm;
