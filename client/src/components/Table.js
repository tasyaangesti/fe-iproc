"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function Table() {
  const [searchUser, setSearchUser] = useState("");

  const fetchUsers = async (req, res) => {
    try {
      const { data } = await axios.get("https://dummyjson.com/users/search", {
        params: { q: searchUser },
      });
      return data.users;
    } catch (error) {
      console.log(error, "error fetching users");
      throw error;
    }
  };

  const { data, error, isLoading, refetch } = useQuery(
    ["users", fetchUsers],
    () => fetchUsers(searchUser),
    { enabled: true }
  );

  useEffect(() => {
    if (searchUser !== "") {
      refetch();
    }
  }, [searchUser, refetch]);

  if (isLoading) {
    return (
      <p className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner text-neutral"></span>
      </p>
    );
  }

  if (error) {
    return <p>Error loading users</p>;
  }

  return (
    <div className="flex flex-col p-4">
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          {/* search */}
          <div className="relative text-gray-500 focus-within:text-gray-900 mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z"
                  stroke="#9CA3AF"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <input
              type="text"
              id="default-search"
              className="block w-80 h-11 pl-12 pr-4 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search for User"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
          </div>
          {/* table */}
          <div className="overflow-hidden rounded-xl shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm font-semibold text-gray-900 capitalize"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm font-semibold text-gray-900 capitalize"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm font-semibold text-gray-900 capitalize"
                  >
                    Password
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm font-semibold text-gray-900 capitalize"
                  >
                    Usia
                  </th>
                  <th
                    scope="col"
                    className="p-5 text-left text-sm font-semibold text-gray-900 capitalize"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((user, idx) => (
                  <tr className="hover:bg-gray-50 transition-all duration-200">
                    <td
                      className="p-5 whitespace-nowrap text-sm font-medium text-gray-900"
                      key={idx}
                    >
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm text-gray-900">
                      {user.username}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm text-gray-900">
                      {user.password}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm text-gray-900">
                      {user.age}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm text-blue-600 hover:underline cursor-pointer">
                      <Link href={`/dashboard/${user.id}`}>Lihat</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
