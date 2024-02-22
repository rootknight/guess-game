export default function CardBgSvg({
  width,
  height,
  iconUrl,
  title,
}: {
  width?: number;
  height?: number;
  iconUrl?: string;
  title?: string;
}) {
  // 计算缩放比例
  const scaleX = (width || 160) / 160; // 160是原始SVG的宽度
  const scaleY = (height || 200) / 200; // 200是原始SVG的高度
  const scale = Math.min(scaleX, scaleY);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      width={width || "100%"}
      height="100%"
      viewBox="0 0 240 240"
    >
      <defs>
        <clipPath id="master_svg0_105_7786">
          <rect x={0} y={0} width={240} height={240} rx={0} />
        </clipPath>
      </defs>
      <g clipPath="url(#master_svg0_105_7786)">
        <g>
          <path
            d="M218.88,0L21.12,0C9.6,0,0,6.75,0,15.375L0,224.625C0,233.25,9.6,240,21.12,240L218.88,240C230.4,240,240,233.25,240,224.625L240,15.375C240,6.75,230.4,0,218.88,0Z"
            fill="#333333"
            fillOpacity={1}
          />
        </g>
        <g>
          <path
            d="M213.143,9L26.8565,9C15.75652,9,9,15.558440000000001,9,23.66L9,132.453L231,226.2L231,24.4316C231,16.33002,224.243,9,213.143,9Z"
            fill="#B70000"
            fillOpacity={1}
          />
        </g>
        <g>
          <ellipse
            cx={72}
            cy={72}
            rx={48}
            ry={48}
            fill="#FFFFFF"
            fillOpacity={1}
          />
        </g>
        <g>
          <path
            d="M231,226L9,226L9,130C122.846,130,231,170.46280000000002,231,226Z"
            fill="#333333"
            fillOpacity={1}
          />
        </g>
        <g>
          <text x="28" y="196" fontSize="28" fill="white">
            {title}
          </text>
        </g>
        <g>
          {/* 直接绘制图案 */}
          <image x={40} y={40} width={64} height={64} xlinkHref={iconUrl} />
        </g>
      </g>
    </svg>
  );
}
