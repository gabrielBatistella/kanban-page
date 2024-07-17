import { BsPlusCircle } from "react-icons/bs";
import Link from "next/link";

export default function AddTaskButton() {
  return (
    <Link
      href="/add-new"
      className="flex flex-row gap-2 items-center py-2 pl-3 pr-4 rounded-md bg-primary cursor-pointer hover:bg-secondary"
    >
      <BsPlusCircle size={24} className="text-background" />
      <span className="text-md text-background whitespace-nowrap">
        Adicionar tarefa
      </span>
    </Link>
  );
}
