interface ModalOff {
  modalOff: (arg: boolean) => void;
}

export default function Modal(props: ModalOff) {
  const { modalOff } = props;

  const handleModalOff = () => {
    modalOff(false);
  };
  return (
    <button
      type="button"
      aria-label="modal"
      onClick={handleModalOff}
      className="absolute flex h-screen w-full items-center justify-center"
      onKeyDown={(e) => {
        console.log(e.key);
      }}
    >
      <div className="h-[80%] w-[80%] bg-white" />
    </button>
  );
}
