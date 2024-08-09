"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";
import axios from "axios";

export default function AddUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      username: "",
      age: "",
    },
  });

  const mutation = useMutation(
    async (formData) => {
      try {
        const response = await axios.post(
          "https://dummyjson.com/users/add",
          formData
        );

        console.log(response, ">> data response add");

        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        router.push("/dashboard");
      },
    }
  );

  const onSubmit = (data) => {
    console.log(data, ">> add user");

    mutation.mutate(data);
  };

  return (
    <div>
      <Form
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        title="Add New User"
        submitButtonText="Add User"
      />
    </div>
  );
}
