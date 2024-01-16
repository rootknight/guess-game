import { Card, CardBody } from "@nextui-org/card";
import MusicPlayer from "@/app/ui/MusicPlayer";

const Header = () => {
  return (
    <Card isBlurred>
      <CardBody className="flex flex-row justify-between align-middle">
        <h1 className="align-middle text-2xl">你比我猜</h1>
        <MusicPlayer />
      </CardBody>
    </Card>
  );
};

export default Header;
