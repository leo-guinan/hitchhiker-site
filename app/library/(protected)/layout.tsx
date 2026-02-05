import { redirect } from "next/navigation";
import { getLibraryAuth } from "@/lib/library-auth";

export default async function LibraryProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { access } = await getLibraryAuth();
  if (!access) {
    redirect("/library");
  }
  return <>{children}</>;
}
