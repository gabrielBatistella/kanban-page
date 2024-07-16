import 'server-only';

import { unstable_noStore as noStore } from "next/cache";
import { readFile } from 'fs/promises';
import path from 'path';

import { type Member, type MemberDbModel } from "@/lib/types/member";
import { getFirstName } from "@/lib/utils/strings";

const dbPath = path.join(process.cwd(), "src/database/members.json");

async function readMembers() {
  const jsonData = await readFile(dbPath, 'utf-8');
  return JSON.parse(jsonData) as MemberDbModel[];
}

export async function fetchMembers() {
  noStore();

  const membersFromDb: MemberDbModel[] = await readMembers();
  const membersFormatted: Member[] = membersFromDb
    .map((member) => ({
      id: member.id,
      firstName: getFirstName(member.name),
      fullName: member.name,
      picture: member.picture,
    }));

  return membersFormatted;
}