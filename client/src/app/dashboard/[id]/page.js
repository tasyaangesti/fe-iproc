"use client";

import { useQuery } from "react-query";
import axios from "axios";
import DetailUser from "@/components/DetailUser";

export default function DashboardId({ params }) {
  const { id } = params;

  const fetchUserById = async () => {
    try {
      const { data } = await axios.get(`https://dummyjson.com/users/${id}`);
      console.log(data, "data profile");
      return data;
    } catch (error) {
      console.log(error, "error profile");
      throw error;
    }
  };

  const { data, isLoading, error } = useQuery(["user", id], fetchUserById);

  if (isLoading) {
    return (
      <p className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner text-neutral"></span>
      </p>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error loading user data.</div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          My Profile
        </h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <DetailUser user={data} />
        </div>
      </div>
    </div>
  );
}
