export const MOIM_CARD_STYLE: { [key: string]: string[] } = {
  home: [
    "w-[366px] p-4",
    "relative flex h-60 w-full items-center overflow-hidden rounded-[20px] bg-gray-100",
    "flex w-full flex-col gap-2 px-2",
    "",
    "flex justify-between py-2",
    "text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap",
    "flex gap-1 text-gray-700",
    "max-w-24 overflow-hidden text-ellipsis whitespace-nowrap",
    "flex justify-end",
  ],
  mypage: [
    "flex w-full max-w-[1100px] items-start gap-2 sm:items-center",
    "flex relative aspect-square min-w-20 w-[40%] h-[40%] max-w-40 items-center justify-center overflow-hidden rounded-[20px] border-2 border-solid border-gray-200 sm:w-40 sm:min-w-40",
    "flex-grow min-w-0 flex flex-col justify-center gap-1 pl-2",
    "flex flex-col gap-1",
    "flex justify-between",
    "text-lg font-bold text-start overflow-hidden text-ellipsis whitespace-nowrap",
    "flex gap-1 text-xs text-gray-700 sm:text-base",
    "xs:max-w-full max-w-11 overflow-hidden text-ellipsis whitespace-nowrap",
    "flex justify-end text-sm",
  ],
};
