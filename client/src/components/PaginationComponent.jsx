import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationComponent = ({ next, prev, currentPage }) => {
  return (
    <div>
    <Pagination
      style={{ justifyContent: "center", marginTop: "1rem" }}
      aria-label="Page navigation"
    >
      <PaginationItem>
        <PaginationLink previous onClick={() => prev()} />
      </PaginationItem>

      <PaginationItem>
        <PaginationLink next onClick={() => next()} />
      </PaginationItem>
    </Pagination>
    <div>Page {currentPage + 1}</div>
    </div>
  );
};

export default PaginationComponent;
