import React from "react";
import TopBar from "./TopBar";
import ContentRowTop from "./ContentRowTop";
import Footer from "./Footer";
import Products from "./ProductsInDb"

function ContentWrapper() {
  return (
    <React.Fragment>
      {/*<!-- Content Wrapper -->*/}
      <div id="content-wrapper" className="d-flex flex-column">
        {/*<!-- Main Content -->*/}
        <div id="content">
          <TopBar />
          <ContentRowTop />
          <Products />
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}
export default ContentWrapper;
