import { ErrorMessage, Form as FormikForm, Field, Formik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ForgotValidation } from "../validation/forgotValidation";
import ResetPasswordLink from "../services/api/auth/reset-password-link-api";
import { useDispatch } from "react-redux";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../store/slices/general_slices/toast_notification_slice";

interface FormValues {
  email: any;
}

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const initialValues: FormValues = {
    email: "",
  };
  const [message, setMessage] = useState<any>("");
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  useEffect(() => {
    if (message === "success" || message === "error") {
      setIsAlertVisible(true);
    }
  }, [message]);

  const HandleSubmit: any = async (values: any) => {
    let resetApi = await ResetPasswordLink(values);
    console.log("forgot pswd api res", resetApi);
    if (resetApi?.data?.message?.msg === "success") {
      dispatch(successmsg("Reset link send"));
      setTimeout(() => {
        dispatch(hideToast());
      }, 2000);
    } else {
      dispatch(failmsg("User With this email Does Not Exists"));
      setTimeout(() => {
        dispatch(hideToast());
      }, 2000);
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className={`col-lg-6 col-sm-9 col-12  mx-auto form_wrap`}>
          <div className="page_heading text-center">
            <h4 className="forgot_passwordh4">forgot your password</h4>
          </div>
          <p className={`mt-4 forgotpassword_p`}>
            Please enter your email address associated with your account and we
            will email you instructions to reset your password.
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={ForgotValidation}
            onSubmit={(values: any, action: any) => {
              console.log("forgot pswd values", values);
              HandleSubmit(values);
            }}
          >
            {({ handleChange, handleBlur }) => (
              <FormikForm className="">
                <div className=" text-center mt-2">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-3 ">
                        <div className={`label text-end mt-1`}>
                          <label htmlFor="" className="forgotpassword_label">
                            Email ID:
                          </label>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="email_block">
                          <Field
                            type="email"
                            className="email_field"
                            name="email"
                            onChange={handleChange}
                          />
                          <br />
                          <div className="error_message">
                            <ErrorMessage name="email" />
                          </div>
                        </div>
                        {/* {isAlertVisible && (
                          <div
                            className={`alert ${
                              message === "success"
                                ? "alert-success"
                                : "alert-danger"
                            } ${styles.otp_alertbox}`}
                            role="alert"
                          >
                            {message === "success"
                              ? "Link is send sucessfully on registered email"
                              : "Please enter valid or registered email"}
                          </div>
                        )} */}
                      </div>
                    </div>

                    <div className={`custom_btn my-4`}>
                      <Link
                        href="/login"
                        legacyBehavior
                        className="forgotpassword-btn"
                      >
                        <button
                          type="button"
                          className={`btn button_color back_forgotpassword mr-2`}
                        >
                          Back
                        </button>
                      </Link>
                      <button
                        type="submit"
                        className={`btn btn-warning button_color btn_forgotpassword`}
                      >
                        SUBMIT
                      </button>
                    </div>
                  </div>
                </div>
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
