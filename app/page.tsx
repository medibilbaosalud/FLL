import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Home: redirige al panel principal en el servidor para evitar middleware edge.
export default function Home() {
  redirect("/app");
}
