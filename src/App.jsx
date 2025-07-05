import React, { Suspense, lazy, useContext } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageProvider, LanguageContext } from "./LanguageContext";
import Header from "./header/Header";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./ScrollToTop";
import LoadingSpinner from "./LoadingSpinner";
import "./App.css";

// lazy‐load pages
const Home          = lazy(() => import("./pages/home/Home"));
const Contact       = lazy(() => import("./pages/contact/Contact"));
const Blog          = lazy(() => import("./pages/blog/Blog"));
const About         = lazy(() => import("./pages/about/About"));
const Services      = lazy(() => import("./pages/services/Services"));
const Article       = lazy(() => import("./pages/blog/singleblog/Article"));
const SingleService = lazy(() => import("./pages/services/singelService/SingleService"));
const Login         = lazy(() => import("./pages/login/Login"));

// simple wrapper for page transitions
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const { lang } = useContext(LanguageContext);
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Redirect bare "/" to "/{lang}" */}
        <Route path="/" element={<Navigate to={`/${lang}`} replace />} />

        {/* All actual pages live under "/:lang" */}
        <Route path=":lang">
          <Route index element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="contact"       element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="blog"          element={<PageWrapper><Blog /></PageWrapper>} />
          <Route path="about"         element={<PageWrapper><About /></PageWrapper>} />
          <Route path="services"      element={<PageWrapper><Services /></PageWrapper>} />
          <Route path="article"       element={<PageWrapper><Article /></PageWrapper>} />
          <Route path="singleservice" element={<PageWrapper><SingleService /></PageWrapper>} />
          <Route path="login"         element={<PageWrapper><Login /></PageWrapper>} />
          {/* Catch‐all for bad paths under a valid lang */}
          <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
        </Route>

        {/* Anything else also bounces back to current lang home */}
        <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <Header />

      <Suspense fallback={<LoadingSpinner />}>
        <AnimatedRoutes />
      </Suspense>

      <Footer />
    </LanguageProvider>
  );
}
