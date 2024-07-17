import React from 'react';

interface DiscardModalProps {
  handleDiscard: () => void;
}

const DiscardModal: React.FC<DiscardModalProps> = ({ handleDiscard }) => {
  return (
    <dialog id="discard_modal" className="modal">
      <div className="modal-box w-11/12 max-w-md">
        <h3 className="font-bold text-lg">Discard Changes</h3>
        <p className="py-4">Are you sure you want to discard your changes?</p>
        <div className="modal-action">
          <button className="btn" onClick={handleDiscard}>
            Yes
          </button>
          <button
            className="btn"
            onClick={() =>
              (
                document.getElementById('discard_modal') as HTMLDialogElement
              )?.close()
            }
          >
            No
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DiscardModal;
