function EditModal({closeModal, /*currentEvent, onEditInputChange, onEditFormSubmit*/}) {
    return (
        <div className="modal-bg">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>Edit Event</h2>
                    <span 
                        onClick={() => closeModal(false)}
                        className="icon">
                            x
                    </span>
                </div>
                <div className="modal-body">
                    <input 
                        type="text"
                        /*value={currentEvent.title}
                        onChange={onEditInputChange}*/
                    />
                    <span 
                        className="icon"
                        /*onClick={onEditFormSubmit}*/
                    >
                        ✔
                    </span>
                </div>
            </div>
        </div>
    )
}

export default EditModal

