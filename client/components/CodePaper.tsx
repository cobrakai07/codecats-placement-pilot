"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  question: string;
  testcases: FileList;
  answercases: FileList;
}

interface QuestionLabelProps {
  addQuestion: (newQuestion: FormValues) => void;
}

function CodePaper({ addQuestion }: QuestionLabelProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    addQuestion(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Question Statement</label>
        <input
          {...register("question", { required: "Question is required" })}
          placeholder="Enter your question here"
          className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.question && (
          <span className="text-red-500">{errors.question.message}</span>
        )}
      </div>
      <div className="flex gap-2 justify-between">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-semibold">Upload Testcase File</label>
          <input
            {...register("testcases", { required: "Testcase file is required" })}
            type="file"
            className="p-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.testcases && (
            <span className="text-red-500">{errors.testcases.message}</span>
          )}
          <label className="text-sm font-semibold">Upload Answer File</label>
          <input
            {...register("answercases", { required: "Answer file is required" })}
            type="file"
            className="p-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.answercases && (
            <span className="text-red-500">{errors.answercases.message}</span>
          )}
        </div>
      </div>
      <div className="flex gap-2 justify-around">
        <button
          type="button"
          onClick={() => reset()}
          className="p-2 rounded-md hover:text-yellow-200"
        >
          Reset
        </button>
        <button type="submit" className="p-2 rounded-md hover:text-yellow-200">
          Save
        </button>
      </div>
    </form>
  );
}

export default CodePaper;
