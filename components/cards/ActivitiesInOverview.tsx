export default function ActivitiesInOverview() {
  return (
    <div className="rounded-xl border-4 ml-20 m-10 border-black w-96">
      <p className="text-xl font-bold p-4 rounded-t-lg bg-[#FFB931]">
        Recent Activities
      </p>
      <div className="border-b-2 border-black bg-white pt-2">
        <div className="bg-slate-200 p-4 rounded-xl m-4">
          <p className="text-lg font-bold">New Device added</p>
          <p className="text-sm">Details</p>
        </div>
        <div className="bg-slate-200 p-4 rounded-xl m-4">
          <p className="text-lg font-bold">Device updated</p>
          <p className="text-sm">Details</p>
        </div>
      </div>
      <div className="border-b-2 h-36 p-4 border-black bg-white">
        <p className="font-bold text-xl">Device Assigned</p>
        <p className="text-sm">Pre-package</p>
      </div>
      <div className="border-b-2 h-36 p-4 mb-2 border-black bg-white">
        <p className="font-bold text-xl">New Device Added</p>
        <p className="text-sm">Details</p>
      </div>
    </div>
  );
}
