"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
}

interface QuestionLabelProps {
  addQuestion: (newQuestion: FormValues) => void;
}

function QuestionLabel({ addQuestion }: QuestionLabelProps) {
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
          <label className="text-sm font-semibold">Option A</label>
          <input
            {...register("optionA", { required: "Option A is required" })}
            type="text"
            placeholder="Enter option A"
            className="p-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.optionA && (
            <span className="text-red-500">{errors.optionA.message}</span>
          )}
          <label className="text-sm font-semibold">Option B</label>
          <input
            {...register("optionB", { required: "Option B is required" })}
            type="text"
            placeholder="Enter option B"
            className="p-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.optionB && (
            <span className="text-red-500">{errors.optionB.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-semibold">Option C</label>
          <input
            {...register("optionC", { required: "Option C is required" })}
            type="text"
            placeholder="Enter option C"
            className="p-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.optionC && (
            <span className="text-red-500">{errors.optionC.message}</span>
          )}
          <label className="text-sm font-semibold">Option D</label>
          <input
            {...register("optionD", { required: "Option D is required" })}
            type="text"
            placeholder="Enter option D"
            className="p-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.optionD && (
            <span className="text-red-500">{errors.optionD.message}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Correct Answer</label>
        <input
          {...register("correctAnswer", {
            required: "Correct Answer is required",
          })}
          type="text"
          placeholder="Enter the correct answer"
          className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.correctAnswer && (
          <span className="text-red-500">{errors.correctAnswer.message}</span>
        )}
      </div>
      <div className="flex gap-2 justify-around">
        <button
          type="button"
          onClick={reset}
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

export default QuestionLabel;
