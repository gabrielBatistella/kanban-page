import { createNewTask } from "@/lib/actions/task"

import FormFields from "@/components/add-new/FormFields";
import CancelButton from "@/components/add-new/CancelButton";
import SubmitButton from "@/components/add-new/SubmitButton";

export default function AddNew() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="text-lg font-bold mb-3">
        Criar nova Tarefa
      </h2>
      <form action={createNewTask} className="w-1/2 min-w-[27rem] flex flex-col gap-4 justify-center items-center">
        <FormFields />
        <div className="w-full flex flex-row justify-evenly items-center">
          <CancelButton />
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
