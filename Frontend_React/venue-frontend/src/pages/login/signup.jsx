import React, { useState } from "react";
import styles from "./newLogin.module.css";
import { REGISTER } from "../../constants/queries";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    let str = e.target.value;
    if (str.includes("@") && str.includes(".")) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/", { state: { data }, replace: true });
  };

  const [registerFunction, { data, loading, error }] = useMutation(REGISTER);

  async function handleSubmit(event) {
    // event.preventDefault();
    console.log(`Registering with email: ${email} and password: ${password}`);
    await registerFunction({
      variables: {
        name,
        email,
        password,
        isAdmin: true, //@TODO- remove this once you finish development
      },
    });
    console.log(data);
    navigateToHome();
  }

  return (
    <div className={styles.login}>
      <div className={styles.nav} />

      <div className={styles.form}>
        <h2 className={styles.formheading}>Register to VenBooker</h2>
        <form action="">
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={(event) => setName(event.target.value)}
              className={styles.input}
              type="text"
              name="name"
              id="name"
              autoFocus
            />
          </div>
          <label htmlFor="email">Email address</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            className={styles.input}
            type="email"
            name="email"
            id="email"
            autoFocus
          />
          <div>
            <label htmlFor="password1">Password</label>
            <input
              onChange={(event) => setPassword(event.target.value)}
              className={styles.input}
              type="password"
              name="password1"
              id="password1"
            />
          </div>
          <input
            className={styles.button}
            onClick={
              //TODO: THIS IS NOT NAVIGATING TO NEXT SCREEN, FIX.
              () => {
                navigateToHome();
                handleSubmit();
              }
            }
            type="submit"
            value="Create account"
          />
        </form>
      </div>
      <div className={styles.line1}>
        <p className={styles.p1}>If you already have an account, you can</p>
        <a className={styles.p1} href="/newLoginPage">
          Sign In Here
        </a>
      </div>
    </div>
  );
};

export default SignUp;
