import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

const Home = lazy(() => import('./Page/Home/Home'));
const About = lazy(() => import('./Page/About/About'));
const Blog = lazy(() => import('./Page/blog/Blog'))
const Partners = lazy(() => import('./Page/Partners/Partners'))
const Subblogs = lazy(() => import('./Page/Subblogs/Subblogs'))
const Security = lazy(() => import('./Page/Security/Security'))
const Contact = lazy(() => import('./Page/Contact/Contact'))
const CampageDesign = lazy(() => import('./Page/CampageDesign/CampageDesign'))
const SocialMedia = lazy(() => import('./Page/SocialMedia/SocialMedia'))
const LinkedinOptimization = lazy(() => import('./Page/LinkedinOptimization/LinkedinOptimization'))
const DesignService = lazy(() => import('./Page/DesignService/DesignService'))
const BrandBuilding = lazy(() => import('./Page/BrandBuilding/BrandBuilding'))
const Reset = lazy(() => import('./Page/PasswordReset/PasswordReset'))
const DashboardBlog = lazy(() => import('./Page/Blogs/Blog'))
const UploadBlog = lazy(() => import('./Page/BlogForm/BlogForm'))
const SEO = lazy(() => import('./Page/SEO/SEO'))
const Webdevelopment = lazy(() => import('./Page/Webdevelopment/Webdevelopment'))
const DashboardContact = lazy(() => import('./Page/DashboardContact/DashboardContact'))
const ErrorPage = lazy(() => import('./Page/ErrorPage/ErrorPage'));
const Loader = lazy(() => import('./Component/Loader/Loader'));
// const DashboardContact = lazy(()=> import('./Page/Contacts/Contact'))

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Subblogs />} />
            <Route path="/partner" element={<Partners />} />

            <Route path="/Service" element={<Security />} />
            <Route path="/campage-design" element={<CampageDesign />} />
            <Route path="/social-media" element={<SocialMedia />} />
            <Route path="/linkedin-optimization" element={<LinkedinOptimization />} />
            <Route path="/design-service" element={<DesignService />} />
            <Route path="/brand-building" element={<BrandBuilding />} />
            
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/training" element={<Training />} /> */}
            <Route path="/password-reset" element={<Reset />} />
            <Route path="/blogs" element={<DashboardBlog />} />
            <Route path="/upload" element={<UploadBlog />} />
            <Route path="/web-development" element={<Webdevelopment />} />
            <Route path="/seo-alchemy" element={<SEO />} />
            <Route path="/contact-details" element={<DashboardContact />} />
            <Route path="*" element={<ErrorPage />} />
            {/* <Route path="/contacts" element={<DashboardContact />}/> */}
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
