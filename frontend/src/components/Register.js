import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useAuth from "../hooks/useAuth";
import ApiErrorBoundary from "./ApiErrorBoundary";

const Register = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [error, setError] = useState(null);

  const initialFormData = {
    email: "",
    username: "",
    password: "",
  };

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const response = await signup(
        formData.email,
        formData.username,
        formData.password
      );
      if (response.success) {
        navigate("/");
      } else {
        setError(response.error);
      }
    },
    [formData, signup, navigate]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          marginTop: "30%",
          border: 2,
          borderColor: "black",
          borderStyle: "solid",
          padding: "40px",
          borderRadius: "10px",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{ marginBottom: "20px" }}
        >
          GPA Sign up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end" sx={{ marginTop: "5%" }}>
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        <ApiErrorBoundary error={error} />
      </div>
    </Container>
  );
};

export default Register;
