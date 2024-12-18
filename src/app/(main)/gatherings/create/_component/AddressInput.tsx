import { Modal } from "@/components/common/modal/Modal";
import { useModalStore } from "@/store/modalStore";
import { FormFieldProps } from "@/types/common/formFieldprops";
import DaumPostcode from "react-daum-postcode";

interface AddressDataType {
  address: string;
  sidoEnglish: string;
  sigungu: string;
}

export default function AddressInput({ form, field }: FormFieldProps) {
  const { closeModal } = useModalStore();

  const handleComplete = ({ address, sidoEnglish, sigungu }: AddressDataType) => {
    field.onChange(address);

    if (sidoEnglish.includes("-do") || sidoEnglish.includes("-si")) {
      const formatSidoText = sidoEnglish.replace(/-do|-si/g, "").toUpperCase();
      form.setValue("location", formatSidoText);
    } else {
      form.setValue("location", sidoEnglish.toUpperCase());
    }
  };

  const handleAddressClose = (state: string) => {
    if (state === "FORCE_CLOSE" || state === "COMPLETE_CLOSE") closeModal();
  };

  return (
    <div>
      <Modal
        size="w-[30rem] h-[35rem]"
        triggerButton={
          <input
            type="text"
            value={field.value}
            className="h-12 w-full cursor-pointer rounded-md border border-gray-500 px-3 py-1 font-medium text-gray-700 placeholder:text-sm placeholder:text-gray-700"
            placeholder="클릭해서 주소를 검색해주세요."
            readOnly
          />
        }
        content={
          <DaumPostcode
            style={{ width: "450px", height: "500px" }}
            onComplete={handleComplete}
            onClose={handleAddressClose}
          />
        }
        showFooter={false}
      />
    </div>
  );
}
