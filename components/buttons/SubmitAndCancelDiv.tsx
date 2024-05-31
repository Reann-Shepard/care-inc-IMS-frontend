import SubmitBtn from './SubmitBtn';
import CancelBtn from './CancelBtn';

interface SubmitAndCancelDivProps {
  cancelPath: string;
}

export default function SubmitAndCancelDiv({
  cancelPath,
}: SubmitAndCancelDivProps) {
  return (
    <div className="flex mt-5 gap-8">
      <SubmitBtn />
      <CancelBtn pathName={cancelPath} />
    </div>
  );
}
