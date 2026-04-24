import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  role: z.enum(["admin", "user", "guest"], {
    errorMap: () => ({ message: "Select a role" }),
  }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept terms" }),
  }),
  address: z.object({
    city: z.string().min(2, "City is required"),
    zip: z.string().regex(/^\d{2}-\d{3}$/, "ZIP format: 12-345"),
  }),
});

type FormValues = z.infer<typeof schema>;

export default function RhfZodExample() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      role: "user",
      acceptTerms: false,
      address: {
        city: "",
        zip: "",
      },
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("RHF submit:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Role</label>
        <select {...register("role")}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="guest">Guest</option>
        </select>
        {errors.role && <p>{errors.role.message}</p>}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register("acceptTerms")} />
          Accept terms
        </label>
        {errors.acceptTerms && <p>{errors.acceptTerms.message}</p>}
      </div>

      <fieldset>
        <legend>Address</legend>

        <div>
          <label>City</label>
          <input {...register("address.city")} />
          {errors.address?.city && <p>{errors.address.city.message}</p>}
        </div>

        <div>
          <label>ZIP</label>
          <input {...register("address.zip")} />
          {errors.address?.zip && <p>{errors.address.zip.message}</p>}
        </div>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
}
