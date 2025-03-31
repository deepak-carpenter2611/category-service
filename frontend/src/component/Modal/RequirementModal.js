"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateMappingRequirement, updateNARequirement } from "@/store/slice/requirementSlice";
import { addComment, fetchCommentsByRequirementId } from "@/store/slice/commentSlice";
import { useSelector } from "react-redux";

export default function RequirementModal({ show, onClose, requirement, commentBox, naBox }) {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("tab1");

    const userData = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('userData')).user : []

    const { comments } = useSelector(state => state.comment)

    // Initialize form data based on existing requirement data
    const [formData, setFormData] = useState({
        mapping_policy: requirement?.mapping_policy || "",
        procedure: requirement?.procedure || "",
        evidence: requirement?.evidence || "",
        comment: "",
        file: null,
        na: requirement?.na || "",
        procedure_file: null,
        evidence_file: null,
    });

    console.log(comments);

    useEffect(() => {
        if (show) {
            document.body.classList.add("modal-open");
            setFormData({
                mapping_policy: requirement?.mapping_policy || "",
                procedure: requirement?.procedure || "",
                evidence: requirement?.evidence || "",
                comment: "",
                file: null,
                na: requirement?.na || "",
                procedure_file: null,
                evidence_file: null,
            });
            dispatch(fetchCommentsByRequirementId(requirement.id))

        } else {
            document.body.classList.remove("modal-open");
        }
    }, [show, requirement]);

    // Handle textarea & file changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };
    // Handle update on confirm
    const handleConfirm = () => {
        if (!requirement?.id) return;

        const updatedData = {};
        if (commentBox) {
            if (formData.comment.trim() !== "") {
                updatedData.comment = formData.comment;
                dispatch(addComment({ requirement_id: requirement.id, message: formData.comment, user_role: userData?.role, sent_by: userData?.id, name: userData?.first_name }));
            }
        } else if (naBox) {
            const formDataObj = new FormData;
            if (formData.file) formDataObj.append("file", formData.file);
            formDataObj.append("na", formData.na)
            dispatch(updateNARequirement({ id: requirement.id, formData: formDataObj }))
        } else {
            const formDataObj = new FormData();
            console.log(formData.evidence_file, formData.procedure_file);
            if (formData.mapping_policy !== requirement?.mapping_policy) formDataObj.append("mapping_policy", formData.mapping_policy)
            if (formData.procedure !== requirement?.procedure) formDataObj.append("procedure", formData.procedure)
            if (formData.evidence !== requirement?.evidence) formDataObj.append("evidence", formData.evidence)
            if (formData.procedure_file) formDataObj.append("procedure_file", formData.procedure_file);
            if (formData.evidence_file) formDataObj.append("evidence_file", formData.evidence_file);
            // if (formData.evidence_file) formDataObj.append("evidence_file", formData.evidence_file);

            dispatch(updateMappingRequirement({ id: requirement.id, updatedData: formDataObj }));

        }

        if (Object.keys(updatedData).length > 0) {
            dispatch(updateMappingRequirement({ id: requirement.id, updatedData }));
        }
        onClose();
    };

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
                    <div className="modal-dialog modal-dialog-centered" style={{
                        maxWidth: commentBox ? "55%" : ""}}>
                        <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                                <h5 className="modal-title">{commentBox ? "Add Comment" : "Requirement Details"}</h5>
                                <button type="button" className="btn-close" onClick={onClose}></button>
                            </div>

                            {/* Modal Body */}
                            <div className="modal-body">
                                {commentBox ? (
                                    <>
                                        {/* Display previous comments */}
                                        <div className="comment-history" style={{ maxHeight: "250px", overflowY: "auto", marginBottom: "10px", border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
                                            {comments?.length > 0 ? (
                                                comments.map((comment, index) => {
                                                    const isMyMessage = Number(comment.user_role) === userData.role;
                                                    const senderName = isMyMessage ? "You" :comment.name ?  comment.name : Number(comment.user_role) === 4 ? "Team Member" : "Assessor";
                                                    const messageTime = new Date(comment.created_at).toLocaleString();
                                                   return (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            display: "flex",
                                                            flexDirection:"column",
                                                            alignItems: isMyMessage ? "flex-end" : "flex-start",
                                                            marginBottom: "8px",
                                                        }}
                                                       >
                                                           <span
                                                               style={{
                                                                   fontSize: "12px",
                                                                   fontWeight: "bold",
                                                                   color: "#555",
                                                                   marginBottom: "2px",
                                                               }}
                                                           >
                                                               {senderName}
                                                           </span>
                                                        <div
                                                            style={{
                                                                maxWidth: "70%",
                                                                padding: "10px",
                                                                borderRadius: "12px",
                                                                background: Number(comment.user_role) === userData.role
                                                                    ? "linear-gradient(88.04deg, #62cff4 .1%, #2c67f2 100.08%)"
                                                                    : "#b4b4b4",
                                                                color: Number(comment.user_role) === userData.role ? "white" : "black",
                                                                wordWrap: "break-word",
                                                                textAlign: "left",
                                                            }}
                                                        >
                                                            {comment.message}
                                                           </div>
                                                           <span
                                                               style={{
                                                                   fontSize: "10px",
                                                                   color: "#777",
                                                                   marginTop: "2px",
                                                                   margin: "2px 5px"
                                                               }}
                                                           >
                                                               {messageTime}
                                                           </span>
                                                    </div>
                                                )}
                                                )
                                            ) : (
                                                <p style={{ textAlign: "center", color: "#999" }}>No comments yet</p>
                                            )}
                                        </div>

                                        {/* Input for new comment */}
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="comment"
                                            placeholder="Enter your comment..."
                                            style={{ width: "100%" }}
                                            value={formData.comment}
                                            onChange={handleChange}
                                        />
                                    </>
                                ) : naBox ? (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label">Upload File</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="file"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Reason for N/A</label>
                                            <textarea
                                                className="form-control"
                                                rows="6"
                                                name="na"
                                                placeholder="Enter Reason why you are selecting N/A..."
                                                style={{ width: "100%", resize: "none" }}
                                                value={formData.na}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <ul className="nav nav-tabs p-2">
                                            <li className="nav-item">
                                                <button
                                                    className={`nav-link ${activeTab === "tab1" ? "bg-black text-white" : ""}`}
                                                    onClick={() => setActiveTab("tab1")}
                                                >
                                                    Policy
                                                </button>
                                            </li>
                                            <li className="nav-item">
                                                <button
                                                    className={`nav-link ${activeTab === "tab2" ? "bg-black text-white" : ""}`}
                                                    onClick={() => setActiveTab("tab2")}
                                                >
                                                    Procedure
                                                </button>
                                            </li>
                                            <li className="nav-item">
                                                <button
                                                    className={`nav-link ${activeTab === "tab3" ? "bg-black text-white" : ""}`}
                                                    onClick={() => setActiveTab("tab3")}
                                                >
                                                    Evidence
                                                </button>
                                            </li>
                                        </ul>

                                        {activeTab === "tab1" && (
                                            <textarea
                                                className="form-control"
                                                rows="6"
                                                name="mapping_policy"
                                                placeholder="Enter policy details..."
                                                style={{ width: "100%", resize: "none" }}
                                                value={formData.mapping_policy}
                                                onChange={handleChange}
                                            />
                                        )}
                                        {activeTab === "tab2" && (
                                            <> <textarea
                                                className="form-control"
                                                rows="6"
                                                name="procedure"
                                                placeholder="Enter procedure..."
                                                style={{ width: "100%", resize: "none" }}
                                                value={formData.procedure}
                                                onChange={handleChange}
                                            />
                                                <input
                                                    type="file"
                                                    className="form-control mt-2"
                                                    name="procedure_file"
                                                    onChange={handleFileChange}
                                                />
                                            </>

                                        )}
                                        {activeTab === "tab3" && (
                                            <>
                                                <textarea
                                                    className="form-control"
                                                    rows="6"
                                                    name="evidence"
                                                    placeholder="Enter evidence..."
                                                    style={{ width: "100%", resize: "none" }}
                                                    value={formData.evidence}
                                                    onChange={handleChange}
                                                />

                                                <input
                                                    type="file"
                                                    className="form-control mt-2"
                                                    name="evidence_file"
                                                    onChange={handleFileChange}
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="modal-footer" style={{ display: "flex", justifyContent: "center" }}>
                                <button type="button" className="btn cancel-btn" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="button" className="btn addEdit-form-submit-btn" onClick={handleConfirm}>
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
