import { type Member } from "@/lib/types/member";
import { fetchMembers } from "@/lib/queries/member";

import FormInput from "@/components/add-new/FormInput";
import FormSelect from "@/components/add-new/FormSelect";

export default async function FormFields() {
  const members: Member[] = await fetchMembers();

  const memberOptions = members.map((member) => ({
    value: member.id.toString(),
    label: member.fullName,
  }));
  const priorityOptions = [
    {
      value: "low",
      label: "Baixa",
    },
    {
      value: "medium",
      label: "Média",
    },
    {
      value: "high",
      label: "Alta",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center">
      <FormInput label="Tarefa" placeholder="Descrição da tarefa" fieldName="description" />
      <FormInput label="Detalhes" placeholder="Detalhes da tarefa" fieldName="details" />
      <FormInput label="Projeto" placeholder="Nome do projeto" fieldName="project" />
      <div className="w-full flex flex-row gap-4 items-center">
        <FormSelect label="Executante" options={memberOptions} fieldName="responsibleId" />
        <FormSelect label="Solicitante" options={memberOptions} fieldName="requesterId" />
      </div>
      <div className="w-full flex flex-row gap-4 items-center">
        <FormInput label="Deadline" placeholder="Data de entrega" fieldName="dueDate" type="date" />
        <FormSelect label="Prioridade" options={priorityOptions} fieldName="priority" />
      </div>
    </div>
  );
}
