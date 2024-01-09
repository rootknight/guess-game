import TitleCard from "@/app/ui/TitleCard";
import SelectWords from "@/app/ui/SelectWords";

export default function page() {
  return (
    <div className="bg-gradient-to-r from-[#FF9D6C] to-[#BB4E75]">
      <div className="container mx-auto md:mx-auto p-4 h-dvh relative">
        <TitleCard title={"你比我猜"} />
        <div className="grid grid-cols-2 gap-2 absolute bottom-4 top-40 left-4 right-4 overflow-y-auto">
          <SelectWords title={"热门"} />
          <SelectWords title={"随机"} />
          <SelectWords title={"成语"} />
          <SelectWords title={"日用品"} />
          <SelectWords title={"动物"} />
          <SelectWords title={"植物"} />
          <SelectWords title={"食物"} />
          <SelectWords title={"网络用语"} />
          <SelectWords title={"动作"} />
          <SelectWords title={"小说人物"} />
          <SelectWords title={"地名"} />
          <SelectWords title={"影视明星"} />
        </div>
      </div>
    </div>
  );
}
