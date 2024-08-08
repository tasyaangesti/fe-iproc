"use client";

import Sidebar from "@/components/Sidebar";
import Table from "@/components/Table";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardPage() {
  const [searchUser, setSearchUser] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-3xl font-bold m-5">User List</h1>
        <Table
          searchUser={searchUser}
          setSearchUser={setSearchUser}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>
    </div>
  );
}
