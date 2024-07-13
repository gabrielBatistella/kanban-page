export type Member = {
  id: number;
  name: string;
  picture: string;
}

let members: Member[] = [
  
];
  
export function getMembers() {
  return members;
}

export function getMemberById(id: number) {
  return members.find((member) => member.id === id);
}