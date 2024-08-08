"use client";

import Sidebar from "@/components/Sidebar";
import Table from "@/components/Table";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-3xl font-bold m-5">User List</h1>
        <Table />
      </div>
    </div>
  );
}
