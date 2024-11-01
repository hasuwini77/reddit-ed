import React, { forwardRef } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, ...props }, ref) => (
    <div>
      <textarea
        ref={ref}
        {...props}
        className={`mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
          error ? "border-red-500" : "border-gray-300 focus:border-blue-500"
        }`}
      />
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  )
);

Textarea.displayName = "Textarea";

export default Textarea;
