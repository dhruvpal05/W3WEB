import { Todo } from "@/types/tasks";
import React from "react";
import Task from "./Task";
import { useSession } from "next-auth/react";

interface TodoListProps {
  tasks: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  const { data: session } = useSession();
  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        {/* head */}
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        {!session && (
          <>
            <tbody>
              <tr>
                <td colSpan={2} className='text-center'>Please sign in to view tasks</td>
              </tr>
            </tbody>
          </>
        )}
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;