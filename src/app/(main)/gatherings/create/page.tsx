import GatheringForm from "./_component/GatheringForm";
import FormLayout from "../_component/FormLayout";

export default function GetheringCreate() {
  return (
    <FormLayout title="모임 만들기">
      <GatheringForm mode="create" />
    </FormLayout>
  );
}
