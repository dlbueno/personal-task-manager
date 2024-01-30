import React from "react";
import urgencies from "./urgencies";

//Code for selectingg urgencies
interface Props {
  onSelectUrgency: (urgency: string) => void;
}

const TaskUrgency = ({ onSelectUrgency }: Props) => {
  return (
    <div className="padding">
      <select
        className="Urgencies"
        onChange={(event) => onSelectUrgency(event.target.value)}
      >
        <option value="">All Urgencies</option>
        {urgencies.map((urgency) => (
          <option key={urgency} value={urgency}>
            {urgency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskUrgency;
