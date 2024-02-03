import { auth } from "@/auth";

const page = async () => {
  const secssion = await auth();
  return <div>{JSON.stringify(secssion)}</div>;
};

export default page;
