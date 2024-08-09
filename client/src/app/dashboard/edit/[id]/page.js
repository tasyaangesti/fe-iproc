"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";

export default function EditPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const queryClient = useQueryClient();

  const fetchUser = async (id) => {
    try {
      const { data } = await axios.get(`https://dummyjson.com/users/${id}`);
      //   console.log(data, "data edit user");

      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(["user", id], () => fetchUser(id));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      username: "",
      age: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const mutation = useMutation(
    async (formData) => {
      try {
        const response = await axios.put(
          `https://dummyjson.com/users/${id}`,
          formData
        );
        console.log(response.data, "dataa mutationn");

        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        console.log("updettt");

        queryClient.invalidateQueries(["user", id]);
        queryClient.refetchQueries(["user", id]);
        router.push(`/dashboard/${id}`);
      },
    }
  );

  const onSubmit = (data) => {
    console.log("masukkk");
    console.log(data, "data di handle submit ");

    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <p className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner text-neutral"></span>
      </p>
    );
  }

  if (error) {
    return <p>Error loading user data.</p>;
  }

  return (
    <div>
      <Form
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        title="Edit Profile"
        submitButtonText="Save Changes"
      />
    </div>
  );
}
