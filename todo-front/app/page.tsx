"use client";
import Image from "next/image";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import { getAllTodos } from "@/api";

export default async function Home() {
  const tasks = await getAllTodos();

  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='flex flex-col gap-4 my-5 text-center'>
        <h1 className='text-2xl font-bold'>Todo List App</h1>
        <div>
          <AddTask />
        </div>
        <TodoList tasks={tasks} />
      </div>
    </main>
  );
}