"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { formSchema } from "../schema/formSchema";
import { typeOptions } from "../constant/contant";
import { useRouter } from "next/navigation";

// Define validation schema

type FormData = z.infer<typeof formSchema>;

export default function AccountForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
    },
  });

  const watchedType = watch("type");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch("/api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      const result = await response.json();

      if (result) {
        setSubmitMessage(
          `Successfully submitted! Name: ${data.name}, Type: ${data.type}`
        );

        router.push("/journalEntry");
      }

      console.log(result);

      reset();
    } catch (error) {
      setSubmitMessage("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectOption = (value: string) => {
    setValue("type", value);
    setIsSelectOpen(false);
  };

  const selectedTypeLabel =
    typeOptions.find((option) => option.value === watchedType)?.label ||
    "Select a type";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 text-black">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200">
        {/* Header */}
        <div className="p-6 pb-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create a Account
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Enter your name and select your type to get started.
          </p>
        </div>

        {/* Form Content */}
        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Type Field */}
            <div className="space-y-2 text-black">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className={`w-full px-3 py-2 text-left border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.type
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  } ${watchedType ? "text-gray-900" : "text-gray-400"}`}
                >
                  {selectedTypeLabel}
                  <ChevronDown
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-transform ${
                      isSelectOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Options */}
                {isSelectOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    {typeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelectOption(option.value)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-md last:rounded-b-md transition-colors"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.type && (
                <p className="text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            {/* Submit Message */}
            {submitMessage && (
              <div
                className={`p-3 rounded-md text-sm border ${
                  submitMessage.includes("Successfully")
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {submitMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isSubmitting
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isSelectOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsSelectOpen(false)}
        />
      )}
    </div>
  );
}
