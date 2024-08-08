import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-grow">
        <h1 className="text-3xl font-bold">Welcome to the Dashboard!</h1>
      </div>
    </div>
  );
}
