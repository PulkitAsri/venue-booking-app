import React, { useEffect, useState } from "react";
import styles from "./newLogin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../../constants/queries";
import { useMutation } from "@apollo/client";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    let str = e.target.value;
    if (str.includes("@") && str.includes(".")) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/", { state: { data } });
  };

  const [loginFunction, { data, loading, error }] = useMutation(LOGIN);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigateToHome();
    }
  }, [loading]);

  const handleSubmit = async (event) => {
    // event.preventDefault();
    console.log(`Logging in with email: ${email} and password: ${password}`);
    const result = await loginFunction({ variables: { email, password } });
    console.log(result);
    if (result.data) {
      localStorage.setItem("token", result.data.login.token);
      console.log("setting token");
      //@TODO- set user to context
      
    }
    console.log(data);
  };

  if (loading) return <p>Loading...</p>;
  if (error) console.log(error);

  return (
    <div className={styles.login}>
      <div className={styles.nav} />
      <div className={styles.form}>
        <h2 className={styles.formheading}>Sign in to VenBooker</h2>
        {error && <span style={{ color: "red" }}>{error.message}</span>}
        <form action="">
          <label htmlFor="email">Email address</label>

          <input
            onChange={(event) => setEmail(event.target.value)}
            className={styles.input}
            type="email"
            value={email}
            name="email"
            id="email"
            autoFocus
          />

          <div>
            <label htmlFor="password1">Password</label>
            <input
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              className={styles.input}
              type="password"
              name="password1"
              id="password1"
            />
          </div>
          <input
            className={styles.button}
            type="submit"
            defaultValue="Create account"
            onClick={async () => {
              await handleSubmit();
              if (!error) navigateToHome();
            }}
          />
        </form>
      </div>
      <div className={styles.line1}>
        <p className={styles.p1}>If you don't have an account, you can</p>
        <a className={styles.p1} href="/signUpPage">
          Register Here
        </a>
        <div>
          <a className={styles.p1} href="/">
            or continue for now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

// export const Logout = () => {
//   const logoutres = () => {
//     console.log("logout");
//   };

//   return <div>
//     <GoogleLogout
//       className={styles.logout}
//       clientId="378817930652-26drd8dhlmr4qet0ilu2qts92m12mpdr.apps.googleusercontent.com"
//       buttonText=""
//       onLogoutSuccess={logoutres}
//     >
//       <p style={{ marginBottom: "8px", marginRight: "10px" }} className={styles.logoutText}>logout</p>
//     </GoogleLogout>
//   </div>

// }
