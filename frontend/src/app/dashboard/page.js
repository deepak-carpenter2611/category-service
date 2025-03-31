import Image from "next/image";
import Dashboard from "@/component/Dashboard/Dashboard";
import DefaultLayout from "@/component/Layouts/DefaultLayout";
export default function Home() {
  return (
    <DefaultLayout>
      <Dashboard />
    </DefaultLayout>
  );
}
