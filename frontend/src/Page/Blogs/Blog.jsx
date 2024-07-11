import React, { useState, useEffect } from "react";
import style from "./Blog.module.css";
import Sidebar from "../../Component/DashboardSidebar/DashboardSidebar";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

import { ImSearch } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Modal from "react-modal"; // Import react-modal
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Swal from "sweetalert2";

Modal.setAppElement("#root"); // Set the root element for the modal

function Blog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]); // State to store fetched blogs data
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const [isLoading, setIsLoading] = useState(false); // State to indicate loading status
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchBy, setSearchBy] = useState(""); // Default to empty string

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  // const userId = localStorage.getItem("userId");

  useEffect(() => {
    const checkAuth = () => {
      console.log(token);
      console.log(userId);
      if (!token || !userId) {
        navigate("/");
        toast.error("Unauthorized access. Redirecting to homepage.");
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

  const customStyles = {
    header: {
      style: {
        backgroundColor: "#3CB371", // Medium sea green
        color: "#ffffff", // White
      },
    },
    headRow: {
      style: {
        backgroundColor: "#3CB371", // Medium sea green for header row
      },
    },
    headCells: {
      style: {
        color: "#ffffff", // White for header cell text
        fontSize: "16px", // Adjust font size if needed
        fontWeight: "bold", // Make header text bold
        paddingLeft: "16px", // Add padding to header cells
        paddingRight: "16px",
      },
    },
    rows: {
      style: {
        backgroundColor: "#ffffff", // White background for rows
        color: "#333333", // Dark gray text color
        borderBottomColor: "#3CB371", // Medium sea green bottom border
        minHeight: "100px", // Set a consistent row height
      },
      highlightOnHoverStyle: {
        backgroundColor: "#f2f2f2", // Light gray background on hover
        color: "#333333", // Dark gray text color on hover
        transitionDuration: "0.15s", // Smooth transition duration
        transitionProperty: "background-color",
        borderBottomColor: "#3CB371", // Medium sea green bottom border on hover
        outline: "none", // Remove outline on hover
      },
    },
    pagination: {
      style: {
        backgroundColor: "#3CB371", // Medium sea green for pagination bar
        color: "#ffffff", // White text color
      },
    },
    table: {
      style: {
        backgroundColor: "#ffffff", // White background for table
        borderRadius: "8px", // Add border radius for a softer look
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add shadow for depth
        borderCollapse: "collapse", // Collapse table borders
        width: "100%", // Set table width to 100%
        marginTop: "16px", // Add top margin for spacing
      },
    },
  };


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch blogs data from the GET route
        const blogsResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog`
        );
        const blogsData = await blogsResponse.json();

        console.log(blogsData);

        setBlogs(blogsData);
        setFilteredBlogs(blogsData); // Initialize filteredBlogs with the same data
      } catch (error) {
        setError(error.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchBy) {
      const filtered = blogs.filter((blog) => {
        let searchField = "";
        if (searchBy === "tagNames") {
          searchField = blog[searchBy].join(", ").toLowerCase();
        } else {
          searchField = (blog[searchBy] || "").toLowerCase();
        }
        return searchField.includes(searchText.toLowerCase());
      });
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchText, searchBy, blogs]);

  const handleSearchByChange = (criteria) => {
    setSearchBy(criteria);
  };

  const handleTokenError = (error) => {
    if (error.response && error.response.status === 403) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      console.error("Token expired or invalid.");
    } else {
      console.error("Error:", error.message || "An error occurred");
    }
  };
  const handleDelete = async (blogId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog/editblog/${blogId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog.blogId !== blogId)
        );
        setFilteredBlogs((prevFilteredBlogs) =>
          prevFilteredBlogs.filter((blog) => blog.blogId !== blogId)
        );
        toast.success("Blog deleted successfully!");
      } else {
        throw new Error("Failed to delete blog");
      }
    } catch (error) {
      handleTokenError(error);
      setError(error.message || "Failed to delete blog");
      toast.error("Failed to delete blog");
    }
  };

  const handleEditClick = (blog) => {
    setCurrentBlog(blog);
    setFile(null);
    setFilePreview(null);
    setEditModalIsOpen(true);
  };

  const handleEditSave = async () => {
    try {
      let updatedBlog = { ...currentBlog };

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/uploadmedia`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (uploadResponse.status === 200) {
          updatedBlog.mediaUrl = uploadResponse.data.url;
          console.log(uploadResponse.data.url);
        } else {
          throw new Error("Failed to upload file");
        }
      }

      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/blog/editblog/${currentBlog.blogId}`,
        updatedBlog,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedBlogData = response.data;
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.blogId === updatedBlogData.blogId ? updatedBlogData : blog
          )
        );
        setFilteredBlogs((prevFilteredBlogs) =>
          prevFilteredBlogs.map((blog) =>
            blog.blogId === updatedBlogData.blogId ? updatedBlogData : blog
          )
        );
        toast.success("Blog updated successfully!");
        setEditModalIsOpen(false);
      } else {
        throw new Error("Failed to update blog");
      }
    } catch (error) {
      handleTokenError(error);
      setError(error.message || "Failed to update blog");
      toast.error("Failed to update blog");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  const handlePublishStatusChange = async (blogId, newStatus) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the status to ${newStatus ? "Publish" : "Draft"
        }?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/blog/${blogId}/publish`,
          { publish: newStatus },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          const updatedBlog = response.data;
          setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
              blog.blogId === updatedBlog.blogId ? updatedBlog : blog
            )
          );
          setFilteredBlogs((prevFilteredBlogs) =>
            prevFilteredBlogs.map((blog) =>
              blog.blogId === updatedBlog.blogId ? updatedBlog : blog
            )
          );
          toast.success("Blog status updated successfully!");
        } else {
          throw new Error("Failed to update blog status");
        }
      } catch (error) {
        handleTokenError(error);
        setError(error.message || "Failed to update blog status");
        toast.error("Failed to update blog status");
      }
    }
  };

  const columns = [
    {
      name: "#",
      selector: (row) => row.rowNumber, // Use rowNumber for unique identification
      sortable: false, // Row number should not be sortable
      width: "60px",
      center: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "250px",
    },
    {
      name: "Image",
      selector: (row) => row.mediaUrl,
      sortable: false,
      width: "150px",
      cell: (row) => (
        <img
          src={row.mediaUrl}
          alt={row.title}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
      sortable: true,
      width: "250px",
    },
    {
      name: "Author",
      selector: (row) => row.authorName,
      sortable: true,
      width: "200px",
    },

    {
      name: "Published At",
      selector: (row) => row.createdAt,
      sortable: true,
      // format: (row) => dayjs(row.createdAt).format("YYYY-MM-DD"),
      width: "250px",
    },

    {
      name: "Status",
      selector: (row) => row.publish,
      sortable: true,
      width: "150px",
      // right: true,
      cell: (row) => (
        <button
          onClick={() => handlePublishStatusChange(row.blogId, !row.publish)}
          style={{
            background: row.publish
              ? "linear-gradient(to right, #00b09b, #96c93d)"
              : "linear-gradient(to right, #ff7e5f, #feb47b)",
            color: "#ffffff",
            borderRadius: "5px",
            padding: "5px 10px",
          }}
        >
          {row.publish ? "Publish" : "Draft"}
        </button>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => handleEditClick(row)}
            style={{
              backgroundColor: "#3d3d3d",
              color: "#ffffff",
              borderRadius: "5px",
              padding: "5px 10px",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.blogId)}
            style={{
              backgroundColor: "#ff3d3d",
              color: "#ffffff",
              borderRadius: "5px",
              padding: "5px 10px",
            }}
          >
            Delete
          </button>
        </div>
      ),
      width: "150px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <div className={style.div}>
        <Sidebar />
      </div>

      <div className={style.Blog}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div className={style.Searching}>
            <ImSearch className={style.search} />
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className={`${style.searchbutton} ${searchBy === "title" ? style.active : ""
                }`}
              onClick={() => handleSearchByChange("title")}
            >
              Title
            </button>
            <button
              className={`${style.searchbutton} ${searchBy === "authorName" ? style.active : ""
                }`}
              onClick={() => handleSearchByChange("authorName")}
            >
              Author
            </button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredBlogs}
          progressPending={isLoading}
          customStyles={customStyles}
          pagination
          highlightOnHover
          pointerOnHover
        />
        {error && (
          <div
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {error}
          </div>
        )}
        <ToastContainer />

        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={() => setEditModalIsOpen(false)}
          contentLabel="Edit Blog"
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              width: "50%",
              maxHeight: "80vh", // Limit maximum height of modal content
              overflowY: "auto", // Enable vertical scrolling if content overflows
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#242424",
              color: "#ffffff",
              padding: "20px",
              borderRadius: "10px",
            },
          }}
        >
          {currentBlog && (
            <div>
              <h2>Edit Blog</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSave();
                }}
              >
                <div>
                  <label>Title</label>
                  <input
                    type="text"
                    value={currentBlog.title}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, title: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      color: "black",
                    }}
                  />
                </div>
                <div>
                  <label>Slug</label>
                  <input
                    type="text"
                    value={currentBlog.slug}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, slug: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      color: "black",
                    }}
                  />
                </div>
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <label htmlFor="content">Content</label>
                  <ReactQuill
                    theme="snow"
                    value={currentBlog.content}
                    onChange={(value) =>
                      setCurrentBlog({ ...currentBlog, content: value })
                    }
                    modules={{ toolbar: toolbarOptions }}
                    style={{ height: "300px" }}
                    className="quill"
                    placeholder="Write your content here..."
                  />
                </div>

                <div>
                  <label>Author</label>
                  <input
                    type="text"
                    value={currentBlog.authorName}
                    onChange={(e) =>
                      setCurrentBlog({
                        ...currentBlog,
                        authorName: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      color: "black",
                    }}
                  />
                </div>

                <div>
                  <label>Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  />
                  {filePreview && (
                    <img
                      src={filePreview}
                      alt="Preview"
                      style={{
                        width: "50%",
                        maxHeight: "200px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#3d3d3d",
                    color: "#ffffff",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
                <button
                  style={{
                    backgroundColor: "#3d3d3d",
                    color: "#ffffff",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => setEditModalIsOpen(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default Blog;
