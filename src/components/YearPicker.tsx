import React from "react";
import { Select, MenuItem } from "@material-ui/core";

interface YearPickerProps {
  value: string | null;
  onChange: (year: string | null) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({ value, onChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1980 + 1 },
    (_, index) => 1980 + index
  );

  return (
    <Select
      value={value || ""}
      onChange={(e) =>
        onChange(e.target.value === "" ? null : (e.target.value as string))
      }
      variant="outlined"
      fullWidth
      displayEmpty
    >
      <MenuItem value="">Select Year</MenuItem>
      {years.map((year) => (
        <MenuItem key={year} value={year.toString()}>
          {year}
        </MenuItem>
      ))}
    </Select>
  );
};

export default YearPicker;
