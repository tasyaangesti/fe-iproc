import Sidebar from "@/components/Sidebar";
import Table from "@/components/Table";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">User</h1>
        <Table />
      </div>
    </div>
  );
}
