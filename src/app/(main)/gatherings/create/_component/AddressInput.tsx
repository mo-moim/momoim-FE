import { Modal } from "@/components/common/modal/Modal";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/store/modalStore";
import { FormFieldProps } from "@/types/common/formFieldprops";
import DaumPostcode from "react-daum-postcode";

interface AddressDataType {
  address: string;
  sidoEnglish: string;
}

export default function AddressInput({ form, field }: FormFieldProps) {
  const { closeModal } = useModalStore();

  const getFullAddress = () => {
    const roadAddress = form.getValues("roadAddress") || "";
    const detailAddress = form.getValues("detailAddress") || "";

    if (roadAddress && detailAddress) {
      const fullAddress = `${roadAddress} ${detailAddress}`;
      form.setValue("address", fullAddress);
    } else if (roadAddress) {
      form.setValue("address", roadAddress);
    }
  };

  const handleComplete = ({ address, sidoEnglish }: AddressDataType) => {
    if (sidoEnglish.includes("-do") || sidoEnglish.includes("-si")) {
      const formatSidoText = sidoEnglish.replace(/-do|-si/g, "").toUpperCase();
      form.setValue("location", formatSidoText);
    } else {
      form.setValue("location", sidoEnglish.toUpperCase());
    }

    field.onChange(address);
    getFullAddress();
  };

  const handleAddressClose = (state: string) => {
    if (state === "FORCE_CLOSE" || state === "COMPLETE_CLOSE") closeModal();
  };

  return (
    <div className="space-y-4">
      <Modal
        size="w-[30rem] h-[35rem] max-sm:w-[27rem] max-xs:w-80"
        triggerButton={
          <Input
            type="text"
            value={field.value}
            className="h-12 w-full cursor-pointer rounded-md border border-gray-500 px-3 py-1 font-medium text-gray-700"
            placeholder="클릭을 통해 주소를 검색해주세요."
            {...form.register("roadAddress")}
            readOnly
          />
        }
        content={
          <DaumPostcode
            style={{ width: "100%", height: "480px" }}
            onComplete={handleComplete}
            onClose={handleAddressClose}
          />
        }
        showFooter={false}
      />
      <Input
        type="text"
        className="border-gray-500 font-medium text-gray-700"
        placeholder="상세주소를 입력해주세요."
        onChange={(e) => {
          form.setValue("detailAddress", e.target.value);

          getFullAddress();
        }}
      />
    </div>
  );
}
