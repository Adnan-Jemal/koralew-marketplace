

async function page({ params }: { params: Promise<{ chatDocId: string }> }) {
  const param = await params;

  return (
    <div className="  flex mx-auto items-center  justify-center h-[88vh] ">
      chat page for Item {param.chatDocId}
    </div>
  );
}

export default page;
