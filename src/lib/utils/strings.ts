export function getFirstName(fullName: string) {
  const names: string[] = fullName.split(" ");
  return names[names.length - 1]; // To fit the japanese nomenclature of the examples on the mock database
}