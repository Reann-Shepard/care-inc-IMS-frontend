import SubmitBtn from '@/components/buttons/SubmitBtn';
import CancelBtn from '@/components/buttons/CancelBtn';

interface SubSubmitAndCancelDiv {
  handlePath: () => void;
}

export default function SubSubmitAndCancelDiv({
  handlePath,
}: SubSubmitAndCancelDiv) {
  return (
    <div className="flex mt-5 gap-8">
      <SubmitBtn />
      <CancelBtn pathName="subBtn" handleClick={handlePath} />
    </div>
  );
}
