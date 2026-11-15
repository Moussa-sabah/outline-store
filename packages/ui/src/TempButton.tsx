
interface props {
  title: string,
  type: "button" | "submit" | "reset"
  bg?: string,
  textColor?: string,
  textSize?: string,
  borderColor?: string,
  border?: boolean,
  px?: string,
  py?: string,
  width?: string,
  height?: string,
  click?: () => void,
  fullWidth?: 'full'
  fontWeight?: boolean
}

export default function Buttonn({ title, type, bg, textColor, textSize, border, py, px, width, fullWidth, height, borderColor, fontWeight, click }: props) {

  return (
    <button
      type={type ? type : 'button'}
      onClick={click}
      style={{
        padding: `${py ? py : '0'}px ${px ? px : '0'}px`,
        width: width ? `${width}px` : '',
        height: height ? `${height}px` : '',
        fontSize: textSize ? `${textSize}px` : '',
        fontWeight: fontWeight ? 600 : ''
      }}
      className={`relative  text-${textColor}  rounded-md 
       ${border ? 'border' : ''} border-${borderColor} bg-${bg} hover:opacity-75 w-${fullWidth}  capitalize transition-all cursor-pointer`}>
      {title}
    </button>
  )
}
