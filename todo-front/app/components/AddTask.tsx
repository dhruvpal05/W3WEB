"use client";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const { data: session } = useSession();

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    console.log('handleSubmitNewTodo');
    e.preventDefault();
    console.log(newTaskValue);
    
    try {
      await addTodo({
        id: Date.now().toString(),
        title: newTaskValue,
        completed: false,
      });
      setNewTaskValue("");
      setModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error in handleSubmitNewTodo:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-end my-4">
        {session ? (
          <button onClick={() => signOut()} className='btn btn-primary'>
            Sign out
          </button>
        ) : (
          <button onClick={() => signIn('google')} className='btn btn-primary'>
            Sign in
          </button>
        )}
      </div>
      {session && (
        <button
          onClick={() => setModalOpen(true)}
          className='w-full btn btn-primary'
        >
          Add new task <AiOutlinePlus className='ml-2' size={18} />
        </button>
      )}
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='text-lg font-bold'>Add new task</h3>
          <div className='modal-action'>
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
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
    </div>
  );
};

export default AddTask;