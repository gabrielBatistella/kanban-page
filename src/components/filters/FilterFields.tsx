import { BsSearch } from "react-icons/bs";

import { type Member } from "@/lib/types/member";
import { fetchMembers } from "@/lib/queries/member";
import { fetchDifferentProjects } from "@/lib/queries/task";

import FilterInput from "@/components/filters/FilterInput";
import FilterSelect from "@/components/filters/FilterSelect";

export default async function FilterFields() {
  const [members, projects]: [Member[], string[]] = await Promise.all([
    fetchMembers(),
    fetchDifferentProjects(),
  ]);

  const memberOptions = members.map((member) => ({
    value: member.id.toString(),
    label: member.fullName,
  }));
  const projectOptions = projects.map((project) => ({
    value: project,
    label: project,
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
    <div className="w-full flex flex-row gap-4 justify-between items-center">
      <div className="flex flex-[2_2_0%] gap-2 items-center">
        <BsSearch size={24} className="text-secondary" />
        <FilterInput label="Buscar" placeholder="Tarefa ou Detalhes" paramName="search" />
      </div>
      <div className="flex flex-[5_5_0%] gap-4 items-center">
        <FilterSelect label="Executante" options={memberOptions} paramName="responsible" />
        <FilterSelect label="Solicitante" options={memberOptions} paramName="requester" />
        <FilterSelect label="Projeto" options={projectOptions} paramName="project" />
        <FilterSelect label="Prioridade" options={priorityOptions} paramName="priority" />
      </div>
    </div>
  );
}
