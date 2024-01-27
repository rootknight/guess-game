import Image from "next/image";

const ScoreBoard = ({
  successWords,
  skipWords,
}: {
  successWords: string[];
  skipWords: string[];
}) => {
  return (
    <>
      <div className="fixed left-8 bottom-8 flex flex-col items-center gap-2">
        <p className="text-white text-4xl">跳过 {skipWords.length}</p>
        <Image
          src="/arrowSkip.png"
          width={128}
          height={64}
          alt="skip"
          priority={true}
          className="opacity-30 hidden md:block"
        />
        <Image
          src="/phoneSkip.png"
          width={128}
          height={64}
          alt="skip"
          priority={true}
          className="opacity-30 md:hidden"
        />
      </div>
      <div className="fixed right-8 bottom-8 flex flex-col items-center gap-2">
        <p className="text-white text-4xl">成功 {successWords.length}</p>
        <Image
          src="/arrowSuccess.png"
          width={128}
          height={64}
          alt="skip"
          className="opacity-30 hidden md:block"
        />
        <Image
          src="/phoneSuccess.png"
          width={128}
          height={64}
          alt="skip"
          className="opacity-30 md:hidden"
        />
      </div>
    </>
  );
};

export default ScoreBoard;
