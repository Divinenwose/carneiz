import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Auth/Auth.css";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error("No email provided");
      navigate("/auth");
    } else {
      startResendTimer();
    }
  }, [email]);

  const startResendTimer = () => {
    setCanResend(false);
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpSubmit = async () => {
    try {
      const { data } = await axios.post(`${baseUrl}/api/admin/verify-otp`, {
        email,
        otp,
      });
      toast.success(data.message || "OTP verified!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post(`${baseUrl}/api/admin/resend-otp`, { email });
      toast.success("OTP resent to your email");
      startResendTimer();
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Verify OTP</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button onClick={handleOtpSubmit}>Verify</button>
        <p>
          Didn't receive the OTP?{" "}
          <button onClick={handleResendOtp} disabled={!canResend}>
            {canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}
          </button>
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default VerifyOtp;
