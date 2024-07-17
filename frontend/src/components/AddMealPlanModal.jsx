import React, { useState } from "react";
import Modal from "../components/Modal";
import Input from "../components/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddMealPlanModal = ({ isOpen, onClose, onSave, highlightedDates, disabledDates }) => {
    const [planName, setPlanName] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleAddMealPlan = () => {
        onSave(planName, startDate, endDate);
        onClose();
    };

    const isAddButtonDisabled = !startDate || !endDate;

    return (
        <Modal title="Add meal plan" isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col items-center gap-6">
                <Input label="Plan name" value={planName} onChange={(e) => setPlanName(e.target.value)} />
                <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    dayClassName={(date) => {
                        const highlight = highlightedDates.find(highlight => highlight.date.toDateString() === date.toDateString());
                        return highlight ? highlight.color : undefined;
                    }}
                    excludeDates={disabledDates}
                />
                <button className="btn btn-primary w-full" disabled={isAddButtonDisabled} onClick={handleAddMealPlan}>Add meal plan</button>
            </div>
        </Modal>
    );
};

export default AddMealPlanModal;
