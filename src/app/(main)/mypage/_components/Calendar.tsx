"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  highlightedDates?: Date[];
  customContent?: { date: Date; content: React.ReactNode }[];
};

function IconLeft() {
  return (
    <div className="flex w-full items-center justify-end">
      <ChevronLeft className="h-6 w-6" />
    </div>
  );
}
function IconRight() {
  return (
    <div className="flex w-full items-center justify-start">
      <ChevronRight className="h-6 w-6" />
    </div>
  );
}
function HeadRow() {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date().getDay();
  return (
    <tr className="flex w-full justify-between bg-gray-100 px-5 py-6">
      {days.map((day) => {
        return (
          <th
            key={day}
            className={`w-6 rounded-md text-center text-base font-normal ${day === days[today] ? "text-main" : "text-muted-foreground"}`}
          >
            {day}
          </th>
        );
      })}
    </tr>
  );
}

const getModifiers = (customContent: { date: Date; content: React.ReactNode }[]) => {
  return customContent.reduce(
    (acc, { date }) => {
      const key = date.toISOString().split("T")[0];
      acc[key] = date;
      return acc;
    },
    {} as Record<string, Date>,
  );
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  highlightedDates = [],
  customContent = [],
  onDateChange,
  onYearChange,
  ...props
}: CalendarProps & { onDateChange?: (date: Date) => void; onYearChange?: (year: number) => void }) {
  const handleDayClick = (date: Date) => {
    console.log("클릭한 날짜:", date); // 날짜를 출력
    onDateChange?.(date);
  };
  const modifiers = getModifiers(customContent);
  const todayDate = new Date();
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [currentYear, setCurrentYear] = useState(todayDate.getFullYear());

  const renderDay = (date: Date) => {
    const key = date.toISOString().split("T")[0];
    const custom = customContent.find((item) => item.date.toISOString().split("T")[0] === key);

    const isSelected =
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isPast = date < today;

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    let finalClass = "flex h-8 min-h-8 w-8 items-center justify-center text-center";

    if (isSelected) {
      finalClass += " rounded-full bg-main text-white";
    } else if (isToday) {
      finalClass += " rounded-full bg-gray-400 text-white";
    } else if (custom?.content) {
      finalClass += isPast ? " text-gray-400" : " text-main";
    }

    return (
      <button type="button" className="flex h-14 w-6 flex-col items-center pb-6" onClick={() => setSelectedDate(date)}>
        <div className={finalClass}>{date.getDate()}</div>
        {custom?.content && !isSelected && (
          <div className={`aspect-square w-2 rounded-full ${isPast ? "bg-gray-400" : "bg-main"}`} />
        )}
      </button>
    );
  };

  const handleMonthChange = (date: Date) => {
    const newYear = date.getFullYear();
    if (newYear !== currentYear) {
      setCurrentYear(newYear);
      onYearChange?.(newYear);
    }
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      onMonthChange={handleMonthChange}
      className={cn(className)}
      onDayClick={handleDayClick}
      modifiers={{
        highlighted: Object.values(modifiers),
      }}
      modifiersClassNames={{
        highlighted: "text-main",
      }}
      classNames={{
        months: "w-full border overflow-hidden border-solid rounded-3xl flex flex-col sm:space-x-4 sm:space-y-0",
        month: "",
        caption: "pt-6 px-5 bg-gray-100 flex justify-center relative items-center text-gray-900 text-lg",
        caption_label: "text-lg font-semibold",
        nav: "space-x-1 flex items-center",
        nav_button: cn("h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
        nav_button_previous: "absolute left-4",
        nav_button_next: "absolute right-4",
        table: "w-full border-collapse",
        head_row: "flex w-full justify-between",
        head_cell: `text-muted-foreground rounded-md font-normal text-[0.8rem]`,
        row: "flex w-full mt-2 justify-between px-5 border-b border-gray-300 last:border-b-0",
        // cell: cn(
        //   "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
        //   props.mode === "range"
        //     ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
        //     : "[&:has([aria-selected])]:rounded-md",
        // ),
        day: cn(` hover:bg-none flex flex-col justify-start rounded-full p-0 font-normal aria-selected:opacity-100`),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        // day_selected: "text-main",
        day_selected: "text-primary-foreground hover:text-primary-foreground focus:text-primary-foreground",
        // day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-gray-500 aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft,
        IconRight,
        HeadRow,
        DayContent: ({ date }) => renderDay(date),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

// interface CustomComponents {
//     /** The component for the caption element. */
//     Caption?: (props: CaptionProps) => JSX.Element | null;
//     /** The component for the caption element. */
//     CaptionLabel?: (props: CaptionLabelProps) => JSX.Element | null;
//     /**
//      * The component for the day element.
//      *
//      * Each `Day` in DayPicker should render one of the following, according to
//      * the return value of {@link useDayRender}.
//      *
//      * - an empty `Fragment`, to render if `isHidden` is true
//      * - a `button` element, when the day is interactive, e.g. is selectable
//      * - a `div` or a `span` element, when the day is not interactive
//      *
//      */
//     Day?: (props: DayProps) => JSX.Element | null;
//     /** The component for the content of the day element. */
//     DayContent?: (props: DayContentProps) => JSX.Element | null;
//     /** The component for the drop-down elements. */
//     Dropdown?: (props: DropdownProps) => JSX.Element | null;
//     /** The component for the table footer. */
//     Footer?: (props: FooterProps) => JSX.Element | null;
//     /** The component for the table’s head. */
//     Head?: () => JSX.Element | null;
//     /** The component for the table’s head row. */
//     HeadRow?: () => JSX.Element | null;
//     /** The component for the small icon in the drop-downs. */
//     IconDropdown?: (props: StyledComponent) => JSX.Element | null;
//     /** The arrow right icon (used for the Navigation buttons). */
//     IconRight?: (props: StyledComponent) => JSX.Element | null;
//     /** The arrow left icon (used for the Navigation buttons). */
//     IconLeft?: (props: StyledComponent) => JSX.Element | null;
//     /** The component wrapping the month grids. */
//     Months?: (props: MonthsProps) => JSX.Element | null;
//     /** The component for the table rows. */
//     Row?: (props: RowProps) => JSX.Element | null;
//     /** The component for the week number in the table rows. */
//     WeekNumber?: (props: WeekNumberProps) => JSX.Element | null;
// }
