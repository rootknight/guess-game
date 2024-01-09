import { Progress } from "@nextui-org/progress";
import clsx from "clsx";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

function page({ status }) {
  return (
    <div
      className={clsx(
        "w-screen h-dvh relative bg-blue-500 flex flex-col justify-between p-4",
        {
          "bg-red-500": status === "error",
          "bg-green-500": status === "success",
        }
      )}
    >
      <div className="flex flex-col justify-top items-center">
        <Progress
          isStriped
          aria-label="倒计时"
          color="secondary"
          value={180}
          className="w-full p-4"
        />
        <p className="text-white text-3xl md:text-4xl">180秒</p>
      </div>
      <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-center text-white text-6xl md:text-8xl">
          卧虎藏龙
        </h1>
      </div>
      <footer className="grid grid-cols-2 gap-4">
        <Button as={Link} href={"/"} color="success">
          重新选词
        </Button>
        <Button as={Link} href={"/settlement"} color="success">
          结束游戏
        </Button>
      </footer>
    </div>
  );
}

export default page;
