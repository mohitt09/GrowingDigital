import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./BlogForm.module.css";
import ReactPlayer from "react-player";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [slug, setSlug] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isImageResized, setIsImageResized] = useState(false);
  const [originalImagePreview, setOriginalImagePreview] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const checkAuth = () => {
      if (!token || !userId) {
        navigate("/");
        toast.error("Unauthorized access. Redirecting to homepage.");
      } else {
        setIsLoggedIn(true);
      }
    };

    checkAuth();
  }, [navigate, token, userId]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      setOriginalImagePreview(img.src);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        let resized = false;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
            resized = true;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
            resized = true;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (!blob) return;
          const resizedFile = new File([blob], file.name, { type: file.type });
          setFile(resizedFile);
          setImagePreview(URL.createObjectURL(resizedFile));
          setIsImageResized(resized);
        }, file.type);
      };
    };
  };

  const handleTokenExpiration = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.error("Session expired. Please log in again.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim()) {
      const errorMsg = "Title is required";
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    if (!content.trim()) {
      const errorMsg = "Content is required";
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    if (!file) {
      const errorMsg = "File is required";
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/uploadmedia`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          handleTokenExpiration();
        }
        const errorText = await response.text();
        throw new Error(`Failed to upload file: ${errorText}`);
      }

      const data = await response.json();
      const downloadURL = data.url;

      const blogData = {
        title,
        content,
        mediaUrl: downloadURL,
        authorName,
        slug,
      };

      const blogResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(blogData),
        }
      );

      if (!blogResponse.ok) {
        if (blogResponse.status === 401 || blogResponse.status === 403) {
          handleTokenExpiration();
        }
        const errorText = await blogResponse.text();
        throw new Error(`Failed to create blog: ${errorText}`);
      }

      setTitle("");
      setContent("");
      setFile(null);
      setAuthorName("");
      setSlug("");

      toast.success("Blog created successfully!");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDashboardClick = () => {
    navigate("/blogs");
  };

  return (
    <div className={`${styles.formContainer} ${styles.shadow}`}>
      {loading && <Loader />}
      <div className={styles.mainn}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="flex justify-end">
            <button
              type="button"
              className={styles.ThreeDButton}
              onClick={handleDashboardClick}
            >
              Dashboard
            </button>
          </div>

          <h2 className={styles.heading}>Create a New Blog</h2>

          <div className={styles.inputGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="content">Content</label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={(value) => setContent(value)}
              modules={{ toolbar: toolbarOptions }}
              style={{ height: "300px", overflowY: "auto" }}
              className="quill"
              placeholder="Write your content here..."
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="file">File</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              placeholder="Choose file"
            />
            <div className={styles.imagePreviewContainer}>
              {originalImagePreview && (
                <div className={styles.imageWrapper}>
                  <h4>Original Image</h4>
                  <img
                    src={originalImagePreview}
                    alt="Original Preview"
                    className={styles.imagePreview}
                  />
                </div>
              )}
              {imagePreview && (
                <div className={styles.imageWrapper}>
                  <h4>Resized Image</h4>
                  <img
                    src={imagePreview}
                    alt="Resized Preview"
                    className={styles.resizedImagePreview}
                  />
                  {isImageResized && (
                    <p className={styles.resizedNotice}>
                      Image has been resized.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="authorName">Author Name</label>
            <input
              type="text"
              id="authorName"
              placeholder="Enter author name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              id="slug"
              placeholder="Enter slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BlogForm;
