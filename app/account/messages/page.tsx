import { MessagesSquare } from "lucide-react";

export default async function MessagesPage() {
  return (
    <div className=" lg:flex mx-auto items-center  justify-center hidden">
      <div className="flex flex-col w-full h-80 items-center justify-center text-center">
        <MessagesSquare className="size-36" />
        <h2 className="text-3xl font-bold">Select a Message </h2>
        <p>start a conversation or select a message</p>
      </div>
    </div>
  );
}
