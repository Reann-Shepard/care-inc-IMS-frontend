interface ConfirmCardProps {
  title: string;
  content: string;
  category: string;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export default function ConfirmCard({
  title,
  content,
  category,
  handleConfirm,
  handleCancel,
}: ConfirmCardProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p className="mb-5">{content}</p>
          <div className="card-actions justify-end">
            <button className="btn" onClick={handleConfirm}>
              Confirm
            </button>
            <button className="btn btn-ghost" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
