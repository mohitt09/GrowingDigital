import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import style from './Blog.module.css';
import Aos from "aos";
import "aos/dist/aos.css";

import { Helmet } from 'react-helmet';
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";


function Blog() {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;


  useEffect(() => {
    // Fetch blogs from backend
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blog`)
      .then(response => {
        const allBlogs = response.data;
        const publishedBlogs = allBlogs.filter(blog => blog.publish); // Filter published blogs
        setBlogs(publishedBlogs);
        console.log('publishedBlogs', publishedBlogs);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(blogs.length / blogsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const renderPaginationButtons = () => {
    let buttons = [];

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={style.arrowButton}
      >
        <FaAngleDoubleLeft />
      </button>
    );

    // First page button
    buttons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={currentPage === 1 ? style.active : ''}
      >
        1
      </button>
    );

    // Ellipsis and intermediate page buttons
    if (currentPage > 3) {
      buttons.push(<span key="ellipsis1">...</span>);
    }

    if (currentPage > 1 && currentPage < totalPages) {
      buttons.push(
        <button
          key={currentPage}
          onClick={() => handlePageChange(currentPage)}
          className={style.active}
        >
          {currentPage}
        </button>
      );
    }

    if (currentPage < totalPages - 1 && totalPages > 3) {
      buttons.push(<span key="ellipsis2">...</span>);
    }

    // Last page button
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={currentPage === totalPages ? style.active : ''}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={style.arrowButton}
      >
        <FaAnglesRight />
      </button>
    );

    return buttons;
  };

  return (
    <>
      <Helmet>
        <title>Blog | Growing Digital</title>
        <meta name="description" content="Explore our blog for the latest news, insights, and updates in the field of eCommerce and digital solutions." />
      </Helmet>

      <header style={{ position: "sticky", top: '0', zIndex: '3' }}>
        <Navbar />
      </header>

      <main>
        <div className={style.about}>
          <div className={style.aboutimg}>
            <h1 data-aos="fade">
              Welcome To Our Blog
            </h1>
            <p data-aos="fade">
              Understand more about our industry field, discover the latest news and advancements in eCommerce and get to know us and our achievements more.
            </p>
          </div>
        </div>

        {currentBlogs.map(blog => (
          <section data-aos="fade-up" key={blog.blogId} className={style.Blog}>
            <div className={style.one}>
              <img src={blog.mediaUrl} alt={blog.title} />
              <div className={style['title-overlay']}>
                <h2>{blog.title}</h2>
              </div>
            </div>
            <div className={style.two}>
              <h1>
                <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
              </h1>
              <div className={style.p} dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </section>
        ))}

        <nav className={style.pagination} aria-label="Blog Pagination">
          {renderPaginationButtons()}
        </nav>
      </main>
      
      <Footer />
    </>
  );
}

export default Blog;
