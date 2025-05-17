
import * as React from "react";
import { format } from "date-fns";
import { ar } from 'date-fns/locale';
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Locale } from "date-fns";

interface DatePickerProps {
  selected?: Date;
  onChange?: (date: Date) => void;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  locale?: Locale;
  className?: string;
  placeholder?: string;
}

export function DatePicker({ 
  selected, 
  onChange, 
  dateFormat = "PPP", 
  minDate, 
  maxDate, 
  locale = ar,
  className,
  placeholder = "اختر تاريخًا"
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(selected);

  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate && onChange) {
      onChange(newDate);
    }
  };

  React.useEffect(() => {
    if (selected && selected !== date) {
      setDate(selected);
    }
  }, [selected]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-right font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="ml-2 h-4 w-4" />
          {date ? format(date, dateFormat, { locale }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          locale={locale}
          // Pass these props conditionally to avoid the type error
          {...(minDate ? { fromDate: minDate } : {})}
          {...(maxDate ? { toDate: maxDate } : {})}
          className="pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
}
