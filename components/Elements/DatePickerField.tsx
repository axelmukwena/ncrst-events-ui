import "react-datepicker/dist/react-datepicker.css";

import React from "react";
import DatePicker from "react-datepicker";

interface DatePickerFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  name: string;
  required?: boolean;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  value,
  onChange,
  name,
  required = false,
}) => (
  <div className="date-picker-field">
    <label htmlFor={name}>{label}</label>
    <DatePicker
      selected={value}
      onChange={onChange}
      name={name}
      required={required}
    />
  </div>
);

export default DatePickerField;
