// import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoginImage from "../../assets/login.jpeg";
import { storeLogo } from "../../assets";

type Field = {
  name: string;
  type: string; // "text", "email", "password", or "select"
  placeholder: string;
  value: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options?: { id: number; label: string; value: string }[]; // for select fields
};

type FooterText = {
  prompt: string;
  linkText: string;
  linkTo: string;
  onSubmit?: () => void;
};

type AuthFormProps = {
  title: string;
  fields: Field[];
  onSubmit?: () => void;
  buttonText: string;
  footerText: FooterText;
  loading?: boolean;
};

const AuthForm = ({
  title,
  fields,
  buttonText,
  onSubmit,
  footerText,
  loading,
}: AuthFormProps) => {
  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${LoginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 z-10 bg-orange-600/45"></div>

      {/* Content on top of overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full p-5">
        {/* Logo and Title */}
        <div className="flex flex-row  items-center mb-2 lg:mb-6">
          <img
            src={storeLogo}
            alt="store_logo"
            className=" w-24 md:w-28 h-auto "
          />
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            LeadCity <br /> Superstore
          </h1>
        </div>

        <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-xl px-8 py-10 w-full max-w-md text-white">
          <h1 className="text-4xl font-bold mb-8 text-center">{title}</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit?.();
            }}
            className="flex flex-col space-y-4"
          >
            {fields.map((field) =>
              field.type === "select" ? (
                <select
                  key={field.name}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  className="px-4 py-2 rounded-md bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-orange-400"
                  required
                >
                  <option value="" disabled>
                    {field.placeholder || "Select an option"}
                  </option>
                  {field.options?.map((opt, idx) => (
                    <option
                      key={`${opt.id}-${idx}`}
                      value={opt.value}
                      className="text-orange-700"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  className="px-4 py-2 rounded-md bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              )
            )}

            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-md transition-all"
              disabled={loading}
            >
              {loading ? "loading..." : buttonText}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-white/80">
            {footerText.prompt}{" "}
            <Link
              to={footerText.linkTo}
              className="underline text-orange-200 hover:text-white"
            >
              {footerText.linkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
