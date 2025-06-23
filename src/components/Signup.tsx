import { useEffect, useState } from "react";
import AuthForm from "../components/auth/AuthForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL ;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
    username: "",
    password: "",
    role: "",
  });

  const [roles, setRoles] = useState<
    { id: number; label: string; value: string }[]
  >([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/role/`);
        const roleOptions = response.data.map((role: any) => ({
          id: role.id,
          label: role.name,
          value: String(role.id),
        }));
        setRoles(roleOptions);
      } catch (error) {
        toast.error("Failed to fetch roles");
        console.error("Role fetch error:", error);
      }
    };

    fetchRoles();
  }, [apiUrl]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const {
      firstname,
      lastname,
      email,
      address,
      phone,
      username,
      password,
      role,
    } = formData;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !address ||
      !phone ||
      !username ||
      !password ||
      !role
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${apiUrl}/staff/staff`, {
        firstname,
        lastname,
        email,
        address,
        phone,
        username,
        password,
        role_id: role, // assuming backend expects `role_id`
      });

      toast.success("Signup successful!");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.detail || "Signup failed";
      toast.error(message);
    }
  };

  return (
    <AuthForm
      title="Sign Up"
      buttonText="Sign up"
      onSubmit={handleSubmit}
      fields={[
        {
          name: "firstname",
          type: "text",
          placeholder: "Alicia",
          value: formData.firstname,
          onChange: handleChange,
        },
        {
          name: "lastname",
          type: "text",
          placeholder: "Salam",
          value: formData.lastname,
          onChange: handleChange,
        },
        {
          name: "email",
          type: "email",
          placeholder: "example@gmail.com",
          value: formData.email,
          onChange: handleChange,
        },
        {
          name: "address",
          type: "text",
          placeholder: "111, Lagos Nigeria",
          value: formData.address,
          onChange: handleChange,
        },
        {
          name: "phone",
          type: "text",
          placeholder: "08136020880",
          value: formData.phone,
          onChange: handleChange,
        },
        {
          name: "username",
          type: "text",
          placeholder: "Enter username",
          value: formData.username,
          onChange: handleChange,
        },
        {
          name: "password",
          type: "password",
          placeholder: "Password",
          value: formData.password,
          onChange: handleChange,
        },
        {
          name: "role",
          type: "select",
          placeholder: "Select Role",
          value: formData.role,
          onChange: handleChange,
          options: roles,
        },
      ]}
      footerText={{
        prompt: "Already have an account?",
        linkText: "Login",
        linkTo: "/login",
      }}
    />
  );
};

export default Signup;
