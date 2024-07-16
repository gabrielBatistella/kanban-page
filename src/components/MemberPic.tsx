import Image from "next/image";

import { type Member } from "@/lib/types/member";

type MemberPicProps = {
  member: Member;
  size: number;
}

export default function MemberPic(props: MemberPicProps) {
  return (
    <Image
      src={props.member.picture}
      alt={`Foto de ${props.member.fullName}`}
      width={props.size}
      height={props.size}
      className="rounded-full"
    />
  );
}