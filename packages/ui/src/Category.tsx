


interface props {
    category: string,
    setCategory: (category: string) => void
    show?:string
}

export default function Category({ category, setCategory,show }: props) {

    return (
        <button type="button" onClick={() => setCategory(category)} className=" relative  border-white/60 border-b py-1.5
         hover:bg-whiteButtonsHover  hover:text-primary hover:px-1
          transition-all flex items-center justify-between   
          cursor-pointer  capitalize
           ">{show? show:category}</button>
    )
}