import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDate } from "../slicers/datePickerSlice";

function DatePicker() {
  const dispatch = useDispatch();
  const { startDate, endDate, focusedInput } = useSelector(
    (state) => state.datePicker
  );

  useEffect(() => {
    console.log(startDate);
  }, [startDate]);

  // TODO: Add time component
  // TODO: Figure out how to pass start date and end date out.
  // TODO: Block dates via https://github.com/airbnb/react-dates/issues/971
  // Use isDayBlocked and isOutsideRange
  return (
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      numberOfMonths={1}
      startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
      endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
      onDatesChange={({ startDate, endDate }) => {
        dispatch(updateDate({ key: "startDate", data: startDate }));
        dispatch(updateDate({ key: "endDate", data: endDate }));
      }} // PropTypes.func.isRequired,
      focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={(focusedInput) => {
        console.log(focusedInput);
        dispatch(updateDate({ key: "focusedInput", data: focusedInput }));
      }} // PropTypes.func.isRequired,
    />
  );
}

export default DatePicker;
