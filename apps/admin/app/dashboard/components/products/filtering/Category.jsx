
export default function Category({ category, change }) {
    return (
        <button onClick={() => { change(category) }} className=" relative border-b pb-1 border-white/60 hover:bg-whiteButtonsHover hover:text-primary hover:px-1 cursor-pointer flex items-center justify-between">{category}</button>
    )
}