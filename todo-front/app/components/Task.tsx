"use client";

import { Todo } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { IoCheckmarkDoneCircleOutline, IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: Todo;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.title);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await editTodo({
        id: task.id,
        title: taskToEdit,
        completed: task.completed
      });
      setOpenModalEdit(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTodo(id);
      setOpenModalDeleted(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr key={task.id}>
      <td className='w-full'>{task.title}</td>
      <td className='flex gap-5'>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          className='text-blue-500'
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='text-lg font-bold'>Edit task</h3>
            <div className='modal-action'>
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type='text'
                placeholder='Type here'
                className='w-full input input-bordered'
              />
              <button type='submit' className='btn'>
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-red-500'
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            Are you sure you want to delete this task?
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(task.id)} className='btn'>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
