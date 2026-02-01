"use client";

import { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";

import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DatepickerProps {
    date: Date | undefined;
    setDate: Dispatch<SetStateAction<Date | undefined>>;
}

const Datepicker = ({ date, setDate }: DatepickerProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
                >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <ChevronDownIcon data-icon="inline-end" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    defaultMonth={date}
                />
            </PopoverContent>
        </Popover>
    );
};

export default Datepicker;
