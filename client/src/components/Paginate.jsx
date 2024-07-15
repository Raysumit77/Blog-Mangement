import React from "react";
import { Pagination } from "react-bootstrap";
import { usePagination, DOTS } from "../hooks/usePagination";

export const Paginate = ({ currentPage, limit, setPage, setLimit, total }) => {
  let active = currentPage;
  const items = [];

  const totalNumberOfPages = Math.ceil(total / limit); //2

  for (let number = 1; number <= totalNumberOfPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => setPage(number)}
        active={active === number}
      >
        {number}
      </Pagination.Item>
    );
  }
  const paginationRange = usePagination({
    currentPage,
    totalCount: total,
    siblingCount: 1,
    pageSize: limit,
  });

  if (currentPage === 0 || total === 0) {
    return null;
  }

  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-center d-grid gap-2">
          <ul className="pagination">
            <select
              className="page-item"
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              value={limit}
            >
              <option value="1">1</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </ul>

          <Pagination>
            <Pagination.First
              disabled={currentPage === 1}
              onClick={() => {
                setPage(1);
              }}
            />
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => {
                setPage(currentPage - 1);
              }}
            />
            {paginationRange.map((number, index) => {
              if (number === DOTS) {
                return <Pagination.Ellipsis key={`${index}-${number}`} />;
              }
              return (
                <Pagination.Item
                  key={number}
                  onClick={() => setPage(number)}
                  active={currentPage === number}
                >
                  {number}
                </Pagination.Item>
              );
            })}
            <Pagination.Next
              disabled={currentPage === totalNumberOfPages}
              onClick={() => {
                setPage(currentPage + 1);
              }}
            />
            <Pagination.Last
              disabled={currentPage === totalNumberOfPages}
              onClick={() => {
                setPage(totalNumberOfPages);
              }}
            />
          </Pagination>
        </div>
      </div>
    </>
  );
};
