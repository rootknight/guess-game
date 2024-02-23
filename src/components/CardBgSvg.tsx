export default function CardBgSvg({
  width,
  height,
  icon,
  title,
}: {
  width?: number;
  height?: number;
  icon?: string;
  title?: string;
}) {
  // 计算缩放比例
  // const scaleX = (width || 160) / 160; // 160是原始SVG的宽度
  // const scaleY = (height || 200) / 200; // 200是原始SVG的高度
  // const scale = Math.min(scaleX, scaleY);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 240 240">
      <path
        d="M218.88 0H21.12C9.6 0 0 6.75 0 15.375v209.25C0 233.25 9.6 240 21.12 240h197.76c11.52 0 21.12-6.75 21.12-15.375V15.375C240 6.75 230.4 0 218.88 0"
        fill="#334155"
      />
      <path
        d="M213.143 9H26.857C15.757 9 9 15.558 9 23.66v108.793L231 226.2V24.432C231 16.33 224.243 9 213.143 9"
        fill="#0089B7"
      />
      <circle cx={72} cy={72} fill="#FFF" r={48} />
      <path d="M231 226H9v-96c113.846 0 222 40.463 222 96" fill="#334155" />
      <text x={28} y={196} fontSize={28} fill="#fff">
        {title}
      </text>
      <image x={40} y={40} width={64} height={64} xlinkHref={icon} />
    </svg>
  );
}
