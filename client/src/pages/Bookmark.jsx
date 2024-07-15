import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeAll, removeBookmark } from "../slices/bookmarkSlice";

export const Bookmark = () => {
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.bookmark);
  return (
    <div className="m-5">
      <h1 className="text-center">My Bookmarks</h1>
      <div className="row">
        <div className="col mb-2">
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(removeAll());
            }}
          >
            Remove All
          </button>
        </div>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" colSpan="8">
              Title
            </th>
            <th scope="col">Author</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookmarks.length > 0 ? (
            bookmarks.map((bm, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td colSpan="8">{bm?.title}</td>
                <td>{bm?.author}</td>
                <td className="d-flex justify-content-center">
                  <button
                    className="btn btn-light"
                    onClick={() => dispatch(removeBookmark(bm?.slug))}
                  >
                    <i className="fa fa-trash fa-lg text-danger"></i>
                    </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12} className="text-center">
                No Bookmarks
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
