// DateRangeSelector.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangeSelectorProps {
  lowerLimit?: Date;
  upperLimit?: Date;
  onRangeChange?: (range: { startDate: Date | null; endDate: Date | null }) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ lowerLimit, upperLimit, onRangeChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (onRangeChange) {
      onRangeChange({ startDate: date, endDate });
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    if (onRangeChange) {
      onRangeChange({ startDate, endDate: date });
    }
  };

  return (
    <div className="date-range-selector">
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={lowerLimit}
        maxDate={upperLimit}
        placeholderText="Select start date"
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate || lowerLimit}
        maxDate={upperLimit}
        placeholderText="Select end date"
      />
    </div>
  );
};

export default DateRangeSelector;
