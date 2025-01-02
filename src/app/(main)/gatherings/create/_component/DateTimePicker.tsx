"use client";

import * as React from "react";
import { format } from "date-fns";
import { DatePicker } from "@/components/common/DatePicker";

interface DatePickerFieldProps {
  value: Date;
  onChange: (value: Date | string) => void;
}

export function DateTimePicker({ field }: { field: DatePickerFieldProps }) {
  const [date, setDate] = React.useState<Date>(field.value);

  const handleDateTimeChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      const formattedDate = format(newDate, "yyyy-MM-dd HH:mm:ss");
      field.onChange(formattedDate);
    }
  };

  return (
    <DatePicker
      value={date}
      onChange={handleDateTimeChange}
      showTimePicker
      placeholder="모임 날짜와 시간을 선택해주세요."
      triggerClassName="flex h-12 w-full border-gray-500"
    />
  );
}
