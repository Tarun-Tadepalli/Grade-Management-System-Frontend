import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function EmailVerificationPage() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    fetch(`http://localhost:2025/api/auth/verify?token=${token}`, {
      credentials: "include",
    })
      .then((res) => res.text())
      .then((msg) => {
        toast.success(msg);
        setStatus("Verified! Redirecting...");
        setTimeout(() => navigate("/dashbord"), 2000);
      })
      .catch(() => {
        toast.error("Invalid or expired link");
        setStatus("Verification failed");
      });
  }, []);

  return <div className="text-center mt-32">{status}</div>;
}
