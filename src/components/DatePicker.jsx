import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import { useState } from 'react';

function DatePicker() {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    const updateStartDate = (date) => setStartDate(date)
    const updateEndDate = (date) => setEndDate(date)
    const changeFocus = (focusedInput) => setFocusedInput(focusedInput)

    return (
        <div>
            <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) => {updateStartDate(startDate); updateEndDate(endDate)}} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => changeFocus(focusedInput)} // PropTypes.func.isRequired,
            />
        </div>
    )
}


export default DatePicker;