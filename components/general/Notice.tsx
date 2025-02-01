import { InfoIcon } from "lucide-react";

type noticeProps = {
  title: string;
  message: string;
};

const Notice = ({ title, message }: noticeProps) => {
  return (
    <div className="bg-secondary  mx-auto py-6 px-6 flex items-center justify-center gap-4 rounded-xl flex-col sm:flex-row text-center sm:text-left w-fit">
      <InfoIcon size={72} className="size-20" />
      <div className=" mx-4">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="">{message}</p>
      </div>
    </div>
  );
};

export default Notice;
