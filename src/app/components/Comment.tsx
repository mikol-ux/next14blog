import React from "react";

type comments = {
  id: string;
  content: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
};
const Comment: React.FC<comments> = ({ id, content, timestamp }) => {
  const formatDate = (timestamp?: { seconds: number; nanoseconds: number }) => {
    if (!timestamp) {
      return " ";
    }

    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    return date.toLocaleString("en-US");
  };
  return (
    <div className="text-black border-b-2 border-gray-300" key={id}>
      <p className="text-md text-gray-800 mb-1 font-bold">
        {formatDate(timestamp)}
      </p>
      <p className="text-2xl">{content}</p>
    </div>
  );
};
export default Comment;
