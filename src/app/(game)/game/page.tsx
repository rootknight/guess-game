import { getWordsByCategory } from "@/lib/fetchers/data";
import GameBoard from "@/components/game/game/GameBoard";

async function Page({
  searchParams,
}: {
  searchParams?: {
    type?: string;
    time?: number;
  };
}) {
  //根据当前searchParams获取对应的类型和时间
  const type = searchParams?.type || "random";
  const time = searchParams?.time || 60;
  const { code, msg, data } = await getWordsByCategory(type);
  const resault = data.words || [];
  const categoryTitle = resault[0]?.categoryTitle || "";
  const words = resault.map((item: any) => item.word);

  return (
    <GameBoard type={type} title={categoryTitle} words={words} time={time} />
  );
}
export default Page;
