// src/App.js

import React, { Suspense, lazy, useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageProvider, LanguageContext } from "./LanguageContext";
import Header from "./header/Header";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./ScrollToTop";
import LoadingSpinner from "./LoadingSpinner";
import "./App.css";

// lazy‑load pages
const Home          = lazy(() => import("./pages/home/Home"));
const Contact       = lazy(() => import("./pages/contact/Contact"));
const Blog          = lazy(() => import("./pages/blog/Blog"));
const SingleBlog    = lazy(() => import("./pages/blog/singleblog/SingleBlog"));
const About         = lazy(() => import("./pages/about/About"));
const Services      = lazy(() => import("./pages/services/Services"));
const SingleService = lazy(() => import("./pages/services/singelService/SingleService"));
const Login         = lazy(() => import("./pages/login/Login"));

// Price page (full list view)
const PricePage     = lazy(() => import("./components/mapsection/pricepage/PricePage"));

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

export default function App() {
  const { lang } = useContext(LanguageContext);
  const location = useLocation();

  return (
    <LanguageProvider>
      <ScrollToTop />
      <Header />

      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* "/" → "/{lang}" */}
            <Route path="/" element={<Navigate to={`/${lang}`} replace />} />

            <Route path=":lang">
              <Route index element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="contact" element={<PageWrapper><Contact /></PageWrapper>} />

              {/* BLOG */}
              <Route path="blog" element={<PageWrapper><Blog /></PageWrapper>} />
              <Route path="blog/:slug" element={<PageWrapper><SingleBlog /></PageWrapper>} />

              <Route path="about" element={<PageWrapper><About /></PageWrapper>} />

              {/* SERVICES */}
              <Route path="services" element={<PageWrapper><Services /></PageWrapper>} />
              <Route path="services/:slug" element={<PageWrapper><SingleService /></PageWrapper>} />

              {/* PRICING: full list on mobile “Show More” */}
              <Route path="pricepage" element={<PageWrapper><PricePage /></PageWrapper>} />

              <Route path="login" element={<PageWrapper><Login /></PageWrapper>} />

              {/* catch‑all under valid lang */}
              <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
            </Route>

            {/* global catch‑all */}
            <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
          </Routes>
        </AnimatePresence>
      </Suspense>

      <Footer />
    </LanguageProvider>
  );
}
