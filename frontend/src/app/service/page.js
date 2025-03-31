import DefaultLayout from "@/component/Layouts/DefaultLayout";
import ServiceList from "@/component/Service/List";

export default function Home() {
  return (
    <DefaultLayout>
      <ServiceList />
    </DefaultLayout>
  );
}
