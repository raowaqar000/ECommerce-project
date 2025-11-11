import React from "react";
import Header from "../components/Header";
import './NotFoundPage.css'

function NotFoundPage() {
  return (
    <>
      <Header />
      <div className="error-container">
        <h1 className="error">404</h1>
        <h2 className="error-page">Page Not Found</h2>
      </div>
    </>
  );
}

export default NotFoundPage;
