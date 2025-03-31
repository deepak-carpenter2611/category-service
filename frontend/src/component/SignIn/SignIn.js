"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "../../store/slice/userSlice";
import Link from "next/link";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      router.push("/dashboard")
    } 
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { email, password };

    try {
      const result = await dispatch(login(credentials));
      console.log('result in sign in ', result);
  
      if (result.meta.requestStatus === 'fulfilled') {
        router.push("/dashboard"); 
      } else {
        toast.error(result.payload || "Invalid email or password");
        console.error(result.payload || "Invalid email or password");
      }
    } catch (err) {
      toast.error("Something went wrong! Try again later");
      console.error("Something went wrong");
    }
  };

  return (
    <div className="container-fluid vh-100" style={{ background: "#fff" }}>
      <div className="row h-100">
        <div
          className="col-md-7 d-none d-md-flex align-items-center justify-content-center text-white"
          style={{
            background:
              "linear-gradient(88.04deg, #62CFF4 0.1%, #2C67F2 100.08%",
          }}
        >
          <div className="text-start">
            <h1 className="fw-bold login-lf-title">Category and Service</h1>
            <p className="login-lf-subtext">
              Welcome To Admin Panel
            </p>
          </div>
        </div>

        <div className="col-md-5 d-flex align-items-center justify-content-center">
          <div
            className="card p-4 "
            style={{ borderRadius: "16px", width: "351px" }}
          >
            <h2 className="text-center fw-bold">Hello Again!</h2>
            <p className="text-center text-muted"> Login </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <div className="input-group custom-input">
                  <span className="input-group-text ">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control login-form-field"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ backgroundColor: "transparent", border: "none" }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div
                  className="input-group custom-input "
                  style={{ backgroundColor: "transparent" }}
                >
                  <span className="input-group-text">
                    <i className="bi bi-key"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ backgroundColor: "transparent", border: "none" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                style={{
                  background:
                    "linear-gradient(88.04deg, #62CFF4 0.1%, #2C67F2 100.08%)",
                  padding: "18px 26px",
                  borderRadius: "30px",
                  border: "none",
                }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
