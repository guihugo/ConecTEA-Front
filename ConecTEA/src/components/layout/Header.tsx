import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

export default function Header() {
  return (
    <header
      className="
        flex h-16 items-center justify-end
        border-b px-6
      "
    >
      <Avatar>
        <AvatarFallback>
          GU
        </AvatarFallback>
      </Avatar>
    </header>
  );
}