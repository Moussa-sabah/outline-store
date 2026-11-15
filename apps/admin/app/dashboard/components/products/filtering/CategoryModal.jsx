import Category from "./Category";

export default function CategoryModal({changeCategory}) {
    return (

        <main className="pt-1 absolute">
            <div className="  shadow-2xl z-10 flex flex-col gap-3 p-3 font-semibold  bg-buttons text-white w-25 rounded-lg">
                <Category category='Men' change={changeCategory}/>
                <Category category='Women' change={changeCategory}/>
                <Category category='Kids' change={changeCategory}/>
            </div>
        </main>


    )
}