import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { apiLogin } from "../services/auth";

const Login = () => {
  const navigate = useNavigate();
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
    await apiLogin(formData.email, formData.password);
    navigate("/home");
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
        <form>
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
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Login;