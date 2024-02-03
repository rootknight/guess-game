import LoginForm from "@/components/auth/login/LoginForm";
export const metadata = {
  title: "登陆",
};
const Page = () => {
  return (
    <div className="flex justify-center items-center h-dvh bg-gradient-to-r from-pink-500 to-blue-300">
      <div className="w-80 bg-white p-6 rounded-lg shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
