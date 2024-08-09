"use client";

import Sidebar from "@/components/Sidebar";
import Table from "@/components/Table";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";

export default function DashboardPage() {
  const [searchUser, setSearchUser] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const searchInputRef = useRef(null);
  const router = useRouter();

  const fetchUsers = async (searchUser, sortOrder) => {
    try {
      const { data } = await axios.get("https://dummyjson.com/users/search", {
        params: { q: searchUser, sortBy: "firstName", order: sortOrder },
      });
      console.log(data, "data userr");

      return data.users;
    } catch (error) {
      console.log(error, "error fetching users");
      throw error;
    }
  };

  const { data, error, isLoading, refetch } = useQuery(
    ["users", searchUser, sortOrder],
    () => fetchUsers(searchUser, sortOrder),
    { enabled: true }
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchUser !== "") {
        refetch();
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchUser, sortOrder, refetch]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [data]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token, ">> dashhhh");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  if (isLoading) {
    return (
      <p className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner text-neutral"></span>
      </p>
    );
  }

  if (error) {
    return <p>Error loading users: {error.message}</p>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-100">
        <h1 className="text-3xl font-bold m-5">User List</h1>
        <Table
          data={data}
          searchInputRef={searchInputRef}
          searchUser={searchUser}
          setSearchUser={setSearchUser}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>
    </div>
  );
}
