
import { type PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/state/store";

export default function AuthProvider({
  children,
}: PropsWithChildren) {
  // Can be used for initialization logic, e.g. checking local storage token
  return <>{children}</>;
}

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return user;
};

