"use client";
import { useEffect } from "react";

export default function ConfirmModal({ show, onClose, onConfirm, message }) {
  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [show]);

  return (
    <>
      {show && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                ></button>
              </div>
              <div className="modal-body">
                <p>{message || "Are you sure you want to proceed?"}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
