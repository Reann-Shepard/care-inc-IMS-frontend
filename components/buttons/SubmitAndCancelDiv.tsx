import SubmitBtn from './SubmitBtn';
import CancelBtn from './CancelBtn';

export default function SubmitAndCancelDiv() {
  return (
    <div className="flex mt-5 gap-8">
      <SubmitBtn />
      <CancelBtn />
    </div>
  );
}
