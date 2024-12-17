import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
  Card,
  CardMedia,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../utils/api";

interface IFormData {
  carModel: string;
  price: string;
  phone: string;
  city: string;
  maxPictures: string;
}

export default function CarForm() {
  const [formData, setFormData] = useState<IFormData>({
    carModel: "",
    price: "",
    phone: "",
    city: "",
    maxPictures: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    const maxPictures = parseInt(formData.maxPictures) || 0;

    if (selectedFiles.length + images.length > maxPictures) {
      setError(`You can only upload up to ${maxPictures} images.`);
      return;
    }

    setError("");
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (
      !formData.carModel ||
      !formData.price ||
      !formData.phone ||
      !formData.city ||
      !formData.maxPictures
    ) {
      setError("All fields are required.");
      return;
    }

    const formPayload = new FormData();
    Object.keys(formData).forEach((key) =>
      formPayload.append(key, formData[key as keyof IFormData])
    );
    images.forEach((image) => formPayload.append("images", image));

    try {
      const token = localStorage.getItem("token");
      await axios.post("/car/submit", formPayload, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Car data submitted successfully!");
      setFormData({
        carModel: "",
        price: "",
        phone: "",
        city: "",
        maxPictures: "",
      });
      setImages([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Submit Your Car
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <TextField
        label="Car Model"
        name="carModel"
        fullWidth
        value={formData.carModel}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        fullWidth
        value={formData.price}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Phone"
        name="phone"
        fullWidth
        value={formData.phone}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="City"
        name="city"
        fullWidth
        value={formData.city}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Max Pictures"
        name="maxPictures"
        type="number"
        fullWidth
        value={formData.maxPictures}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
        inputProps={{ min: 1, max: 10 }}
      />

      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ mb: 2 }}
        disabled={!formData.maxPictures || parseInt(formData.maxPictures) <= images.length}
      >
        Upload Images
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </Button>

      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
              />
              <CardActions>
                <IconButton
                  color="error"
                  onClick={() => removeImage(index)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}
