import AuthForm from "../components/auth/AuthForm";

const Signup = () => {
  return (
    <AuthForm
      title="Sign Up"
      fields={[
        {
          name: "firstname",
          type: "text",
          placeholder: " Alicia ",
          value: "",
        },
        {
          name: "lastname",
          type: "text",
          placeholder: " Salam ",
          value: "",
        },
        {
          name: "email",
          type: "email",
          value: "",
          placeholder: " Email (e.g exmaple@gmail.com)",
        },
        {
          name: "address",
          type: "text",
          placeholder: "111, Lagos Nigeria",
          value: "",
        },
        { name: "phone", type: "text", placeholder: "08136020880", value: "" },
        {
          name: "username",
          type: "text",
          placeholder: "Enter username ",
          value: "",
        },
        {
          name: "password",
          type: "password",
          placeholder: "Password",
          value: "",
        },
        {
          name: "role",
          type: "text",
          placeholder: "Your role",
          value: "",
        },
      ]}
      buttonText="Sign up"
      footerText={{
        prompt: "Already have an account?",
        linkText: "Login",
        linkTo: "/login",
      }}
    />
  );
};

export default Signup;
