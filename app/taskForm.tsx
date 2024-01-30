import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import urgencies from "./urgencies";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { schema } from "./schema";
import ErrorMessage from "./ErrorMessage";
import { Button } from "@radix-ui/themes";
import "./styles.css";

type TaskFormData = {
  taskName: string;
  description: string;
  urgency: string;
  dueDate: string;
};

interface Props {
  onSubmit: (data: TaskFormData) => void;
}

const TaskForm: React.FC<Props> = ({ onSubmit }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({ resolver: zodResolver(schema) });

  const handleFormSubmit = async (data: TaskFormData) => {
    try {
      await axios.post("/api/", data);
      data.dueDate = data.dueDate.toString().split("T")[0];
      onSubmit(data);
      router.push("/");
      reset();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <form className="newFormFormat" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="formediting">
        <label htmlFor="taskName" className="form-label">
          Task Name
        </label>
        <input
          {...register("taskName")}
          id="taskName"
          type="text"
          className="b-2"
        />
        <ErrorMessage>
          {errors.taskName && (
            <p className="errors">{errors.taskName.message}</p>
          )}
        </ErrorMessage>
      </div>
      <div className="formediting">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="b-2"
        />
        <ErrorMessage>
          {errors.description && (
            <p className="errors">{errors.description.message}</p>
          )}
        </ErrorMessage>
      </div>
      <div className="formediting">
        <label htmlFor="urgency" className="form-label">
          Urgency
        </label>
        <select {...register("urgency")} id="urgency" className="b-2">
          <option value=""></option>
          {urgencies.map((urgency) => (
            <option key={urgency} value={urgency}>
              {urgency}
            </option>
          ))}
        </select>
        <ErrorMessage>
          {errors.urgency && <p className="errors">{errors.urgency.message}</p>}
        </ErrorMessage>
      </div>
      <div className="formediting">
        <label htmlFor="dueDate" className="form-label">
          Due Date
        </label>
        <input
          {...register("dueDate")}
          id="dueDate"
          type="date"
          className="b-2"
        />
        <ErrorMessage>
          {errors.dueDate && <p className="errors">{errors.dueDate.message}</p>}
        </ErrorMessage>
      </div>
      <div className="Button">
        <Button type="submit" className="padding-bottom:205px">
          Submit Task!
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
