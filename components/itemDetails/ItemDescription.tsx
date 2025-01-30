import React from "react";

export default function ItemDescription({
  description,
}: {
  description: string;
}) {
  return (
    <div className="p-4 flex flex-col gap-3 border border-secondary rounded-2xl overflow-x-auto">
      <h4 className="text-2xl">Description</h4>
      <p>{description}</p>
    </div>
  );
}
