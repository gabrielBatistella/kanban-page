export default function Header() {
  return (
    <div className="h-12 w-full z-10 fixed flex flex-row px-5 items-center justify-between bg-secondary">
      <h1 className="text-xl font-bold ml-2">
        Tarefas
      </h1>

      <div className="flex flex-row items-center">
        <span className="font-bold mr-3">
          M. John Doe
        </span>
      </div>
    </div>
  );
}