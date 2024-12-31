export default function ProfileBoxSkeleton() {
  return (
    <div className="my-6 w-full rounded-[20px] border-2 border-solid border-[#F0F1F6] p-8">
      <div>
        <div className="h-7 text-lg font-black" />
        <div className="flex flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between">
          <div className="my-6 flex w-full items-center">
            <div className="relative flex aspect-square w-[40%] max-w-32 items-center justify-center overflow-hidden rounded-xl border-2 border-solid border-gray-200 bg-gray-200 sm:w-32" />
            <div className="flex flex-col justify-center p-6">
              <div className="font-bold" />
              <div />
            </div>
          </div>
          <div className="h-[48px] w-full rounded-lg border-none bg-gray-200 px-[16px] py-[12px] font-bold sm:w-[100px]" />
        </div>
      </div>
    </div>
  );
}
