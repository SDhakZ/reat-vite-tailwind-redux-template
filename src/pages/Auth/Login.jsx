import { useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { login } from "../../thunks/authThunk";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const usernameError = useSelector((state) => state.auth.usernameError);
  const passwordError = useSelector((state) => state.auth.passwordError);
  const navigate = useNavigate();

  /* ---- After setting up api integration of login ---- 
  const handleLogin = (values) => {
    dispatch(login({ values }))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
      });
  }; */

  // ----------------- Dummy login ------------------- //
  const handleLogin = (values) => {
    localStorage.setItem("token", "token");
    localStorage.setItem("user", "user");
    if (values.username === "admin" && values.password === "12345678") {
      dispatch(login);
      console.log("Logged in");
      navigate("/dashboard/project-space");
    } else {
      console.log("Incorrect credentials");
    }
  };

  const handleKeyPress = (event, formik) => {
    if (event.key === "Enter") {
      formik.submitForm(); // Submit the form on Enter key press
    }
  };

  const handleFieldChange = (field) => {
    if (field === "username" && usernameError) {
      dispatch({ type: "auth/clearUsernameError" }); // Clear username error
    }
    if (field === "password" && passwordError) {
      dispatch({ type: "auth/clearPasswordError" }); // Clear password error
    }
  };
  const emailInputRef = useRef(null); // Ref for the username input

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl ">
              Sign in to your account
            </h1>
            <Formik
              initialValues={{ username: "", password: "", rememberMe: false }}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
              validateOnChange={false} // Disable validation on field change
              validateOnBlur={false} // Disable validation on field blur
            >
              {(formik) => (
                <Form
                  className="space-y-4 md:space-y-6"
                  onKeyDown={(e) => handleKeyPress(e, formik)}
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Your username
                    </label>

                    <Field name="username">
                      {({ field }) => (
                        <input
                          onChange={(e) => {
                            field.onChange(e);
                            handleFieldChange("username");
                          }}
                          {...field}
                          ref={emailInputRef}
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-[#2563eb]  w-full p-2.5 "
                          placeholder="Please enter your username"
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="mt-2 text-sm text-[#F04438]"
                    />
                    {usernameError && (
                      <div className="mt-2 text-sm text-[#F04438]">
                        {usernameError}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Please enter your passsword"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  focus:outline-[#2563eb] block w-full p-2.5 "
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleFieldChange("password"); // Clear password error
                      }}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-2 text-sm text-[#F04438]"
                    />
                    {passwordError && (
                      <div className="mt-2 text-sm text-[#F04438]">
                        {passwordError}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-end w-full">
                    <a
                      href="#"
                      className="text-sm float-right font-medium text-[#2563eb] hover:underline "
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-[#bfdbfe] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Sign in
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}
