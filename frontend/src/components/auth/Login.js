import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useAuth from "../../hooks/useAuth";
import ApiErrorBoundary from "../errors/ApiErrorBoundary";

const Login = () => {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [error, setError] = useState(null);

  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(formData.email, formData.password);
    if (response.success) {

    navigate("/home?tab=accounts");
    } else {
      setError(response.error);
    }
  };

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
          sx={{ marginBottom: "5%" }}
        >
          GPA
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                value={formData.email}
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
                name="password"
                label="Password"
                type="password"
                value={formData.password}
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
            Sign In
          </Button>
        </form>
        <Typography sx={{marginTop:'5%'}}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "blue" }}>
            Sign Up
          </a>
        </Typography>
      </div>
      <ApiErrorBoundary error={error} />
    </Container>
  );
}

export default Login;