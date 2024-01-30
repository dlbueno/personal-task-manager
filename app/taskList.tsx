import React, { useState, ChangeEvent } from "react";
import urgencies from "./urgencies";
import { Button, Flex, Table } from "@radix-ui/themes";

//code for Task List
interface Task {
  id: number;
  taskName: string;
  description: string;
  urgency: string;
  dueDate: string;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (id: number, editedTask: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
  type EditedTaskState = { [key: number]: Task | undefined };
  const [editedTask, setEditedTask] = useState<EditedTaskState>({});

  const toggleEdit = (id: number) => {
    setEditedTask((prevEditedTasks: EditedTaskState) => ({
      ...prevEditedTasks,
      [id]: prevEditedTasks[id]
        ? undefined
        : tasks.find((task) => task.id === id),
    }));
  };

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    taskId: number
  ) => {
    const { name, value } = e.target;

    setEditedTask((prevEditedTasks: EditedTaskState) => ({
      ...prevEditedTasks,
      [taskId]: { ...prevEditedTasks[taskId], [name]: value } as Task,
    }));
  };

  const handleEdit = (id: number) => {
    const editedTaskItem: Task | undefined = editedTask[id];
    if (editedTaskItem) {
      onEdit(id, editedTaskItem);
      toggleEdit(id);
    }
  };

  return (
    <Table.Root variant="surface" className="padding">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Task Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Urgency</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Due Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tasks.map(({ id, taskName, description, urgency, dueDate }: Task) => (
          <Table.Row key={id}>
            <Table.Cell className="mb-3">
              {editedTask[id] ? (
                <input
                  name="taskName"
                  value={editedTask[id]?.taskName || ""}
                  type="text"
                  className="mb-3"
                  onChange={(e) => onChangeInput(e, id)}
                />
              ) : (
                taskName
              )}
            </Table.Cell>

            <Table.Cell className="mb-3">
              {editedTask[id] ? (
                <input
                  name="description"
                  value={editedTask[id]?.description || ""}
                  type="text"
                  className="mb-3"
                  onChange={(e) => onChangeInput(e, id)}
                />
              ) : (
                description
              )}
            </Table.Cell>

            <Table.Cell className="mb-3">
              {editedTask[id] ? (
                <select
                  name="urgency"
                  className="mb-3"
                  value={editedTask[id]?.urgency || ""}
                  onChange={(e) => onChangeInput(e, id)}
                >
                  {urgencies.map((selectedUrgency) => (
                    <option key={selectedUrgency} value={selectedUrgency}>
                      {selectedUrgency}
                    </option>
                  ))}
                </select>
              ) : (
                urgency
              )}
            </Table.Cell>

            <Table.Cell className="mb-3">
              {editedTask[id] ? (
                <input
                  name="dueDate"
                  value={editedTask[id]?.dueDate.toString().split("T")[0] || ""}
                  type="date"
                  className="mb-3"
                  onChange={(e) => onChangeInput(e, id)}
                />
              ) : (
                dueDate
              )}
            </Table.Cell>

            <Table.Cell className="mb-3">
              <Flex gap="3">
                {editedTask[id] ? (
                  <Button
                    className="btn btn-outline-danger"
                    onClick={() => handleEdit(id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    className="btn btn-outline-danger padding-right:50px"
                    onClick={() => toggleEdit(id)}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  className="btn btn-outline-danger"
                  onClick={() => onDelete(id)}
                >
                  Delete
                </Button>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TaskList;
