import { showAlert } from "@/utils/isTextMatched";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import axios from 'axios';
import { api } from "@/utils/apiProvider";
import { Spinner } from "../spinner/Spinner";

const EmailVerify = ({handleChange = () => { } , formData = [] , setIsOtpVerified = () => {}}) => { 
	const [isOtpSend, setIsOtpSend] = useState(false);
	const [isSentOtpLoading, setIsSentOtpLoading] = useState(false);
	const [isVerifyOtpLoading, setIsVerifyOtpLoadingg] = useState(false);
	const [otp,setOtp] = useState("");

	const handleSendOTP = async () => {
		try {
			setIsSentOtpLoading(true);
			const response = await axios.post(`${api}/api/auth/send-otp`, {email : formData.email});
			if (response.status === 200) {
				setIsOtpSend(true);
				showAlert(response.data.message,"success");
			} else {
				showAlert(response.data.message);
			}
			setIsSentOtpLoading(false);
		} catch (error) {
			setIsSentOtpLoading(false);
			showAlert("Something went wrong with OTP, We are sorry !","error");
		}
	}

	const handleVerify = async () => {
		try {
			setIsVerifyOtpLoadingg(true);
			const response = await axios.post(`${api}/api/auth/verify-otp`,{email : formData.email, otp: otp});
			if (response.status === 200) {
				setIsOtpVerified(true);
				showAlert(response.data.message,"success");
			} else {
				showAlert(response.data.message,"error");
			}
			setIsVerifyOtpLoadingg(false);
		} catch (error) {
			setIsVerifyOtpLoadingg(false);
			console.log(error);
			showAlert(error.response?.data?.message,"error");
		}
	}

	return (
		<>
		<div className="col-12 d-flex">
			<div className="form-input " style={{width:"100%"}}>
				<input type="text" name="email" onChange={handleChange} required value={formData.email}/>
				<label className="lh-1 text-14 text-light-1">Email</label>
			</div>
			{!isEmpty(formData.email) && <button className="button py-20 -dark-1 bg-blue-1 text-white" onClick={handleSendOTP} style={{marginLeft: "10px", width:"30%"}}>
				Send OTP <div className="icon-arrow-top-right ml-15" />
				<Spinner isLoading={isSentOtpLoading} />
			</button>
			
			}
		</div>
		{isOtpSend && !isEmpty(formData.email) && <div className="col-12 d-flex">
			<div className="form-input " style={{width:"100%"}}>
				<input type="text" onChange={(e)=>{setOtp(e.target.value)}} required value={otp}/>
				<label className="lh-1 text-14 text-light-1">Enter OTP</label>
			</div>
			<button onClick={handleVerify} className="button py-20 -dark-1 bg-blue-1 text-white" style={{marginLeft: "10px", width:"30%"}}>
				Verify OTP <div className="icon-arrow-top-right ml-15" />
				<Spinner isLoading={isVerifyOtpLoading} />
			</button>
		</div>}
		</>
	)
}
export default EmailVerify;