import { useState } from "react";
import AuthForm from "../components/auth/AuthForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStaff } from "../context/StaffContext";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setStaff } = useStaff();

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const response = await axios.post(
        `${apiUrl}/auth_router/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const { access_token, staff_id } = response.data;
      // if(!staff_id){
      //   toast.error("staff missing in response")
      //   return;
      // }
      console.log("Full response from backend:", response.data);

      localStorage.setItem("token", access_token);

      setStaff({
        id: staff_id,
        name: "",
        email: email,
      });
      toast.success("Login Successful!");

      navigate("/");
    } catch (error: any) {
      console.log(error);
      const backendError = error.response?.data?.detail || "Error loggin in";
      toast.error(backendError);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <AuthForm
      title="Login"
      buttonText="Login"
      onSubmit={handleLogin}
      fields={[
        {
          name: "email",
          type: "email",
          placeholder: "Email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
        },
        {
          name: "password",
          type: "password",
          placeholder: "Password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
        },
      ]}
      footerText={{
        prompt: "Don't have an account yet",
        linkText: "Signup",
        linkTo: "/signup",
      }}
    />
  );
};

export default Login;
