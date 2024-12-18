"use client";

import { DateTimePicker } from "@/app/(main)/gatherings/create/_component/DateTimePicker";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { DEFAULT_GATHERING__CREATE_VALUES, gatheringCreateSchema } from "@/schemas/gatheringCreate";
import { Textarea } from "@/components/ui/textarea";
import inputDataFormat from "@/lib/inputDataFormat";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreate } from "@/queries/gathering/useCreate";
import { GatheringCreateFormData } from "@/types/category";
import FormOnlineAddress from "./FormOnlineAddress";
import FormTypeButton from "./FormTypeButton";
import Category from "./Category";
import GatheringUploadImage from "./GatheringUploadImage";
import AddressInput from "./AddressInput";

export default function GatheringForm() {
  const { mutate: gatheringCreate } = useCreate();

  const form = useForm({
    resolver: zodResolver(gatheringCreateSchema),
    defaultValues: DEFAULT_GATHERING__CREATE_VALUES,
  });

  const onSubmit = (values: GatheringCreateFormData) => {
    const { gatheringType, ...filterFormData } = values;
    gatheringCreate(filterFormData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14">
        <FormFieldWrapper
          control={form.control}
          name="name"
          label="모임 이름"
          placeholder="모임 이름을 입력해주세요."
          customStyle="border-gray-500 text-gray-700 font-medium"
        />
        <FormFieldWrapper
          control={form.control}
          name="image"
          type="text"
          label="대표 이미지"
          renderContent={(field) => <GatheringUploadImage form={form} field={field} />}
        />
        <div className="flex items-center">
          <div className="flex-1">
            <FormFieldWrapper
              control={form.control}
              name="isPeriodic"
              label="모임 주기"
              renderContent={(field) => (
                <div className="space-x-4">
                  <FormTypeButton
                    name="SHORT"
                    buttonText="단기 모임"
                    value={field.value}
                    onChange={() => field.onChange(false)}
                  />
                  <FormTypeButton
                    name="LONG"
                    buttonText="정기 모임"
                    value={field.value}
                    onChange={() => field.onChange(true)}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex-1">
            <FormFieldWrapper
              control={form.control}
              name="gatheringType"
              label="모임 유형"
              renderContent={(field) => (
                <div className="space-x-4">
                  <FormTypeButton
                    name="OFFLINE"
                    buttonText="오프라인"
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      form.setValue("address", "");
                    }}
                  />
                  <FormTypeButton
                    name="ONLINE"
                    buttonText="온라인"
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      form.setValue("location", "ONLINE");
                    }}
                  />
                </div>
              )}
            />
          </div>
        </div>
        <FormFieldWrapper
          control={form.control}
          name="category"
          label="카테고리"
          renderContent={(field) => <Category form={form} field={field} />}
        />
        {form.watch("gatheringType") === "OFFLINE" ? (
          <FormFieldWrapper
            control={form.control}
            name="address"
            label="주소"
            placeholder="모임을 진행할 주소를 입력해주세요."
            customStyle="border-gray-500 text-gray-700 font-medium"
            renderContent={(field) => <AddressInput form={form} field={field} />}
          />
        ) : (
          <FormFieldWrapper
            control={form.control}
            name="address"
            label="플랫폼"
            renderContent={(field) => <FormOnlineAddress form={form} field={field} />}
          />
        )}
        <FormFieldWrapper
          control={form.control}
          name="nextGatheringAt"
          label="날짜"
          renderContent={(field) => (
            <div>
              <DateTimePicker field={field} />
            </div>
          )}
        />
        <FormFieldWrapper
          control={form.control}
          name="capacity"
          label="모집 정원"
          renderContent={(field) => (
            <Input
              type="number"
              className="inputCountButton border-gray-500 pl-4 text-gray-700"
              value={field.value}
              min={2}
              max={50}
              onChange={(e) => field.onChange(inputDataFormat(e.target.value))}
            />
          )}
        />
        <FormFieldWrapper
          control={form.control}
          name="description"
          label="모임 설명"
          renderContent={(field) => (
            <Textarea
              className="h-80 border-gray-500 p-4 font-medium md:text-base"
              placeholder="생성할 모임에 대해 설명을 입력해주세요."
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <div className="flex items-center justify-center gap-8">
          <Button type="button" size="lg" variant="outline">
            작성 취소
          </Button>
          <Button type="submit" size="lg" variant="main">
            모임 생성 완료
          </Button>
        </div>
      </form>
    </Form>
  );
}
