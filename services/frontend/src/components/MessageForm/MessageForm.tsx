import { t } from "i18next";
import React, { useState } from "react";

interface MessageFormProps {
  onSubmit: (text: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-200 p-5 rounded-lg shadow-md m-2"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full py-2 px-4 rounded-md shadow-sm mb-2"
        placeholder="viestisi tähän..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600"
      >
        {t("send")}
      </button>
    </form>
  );
};

export default MessageForm;
