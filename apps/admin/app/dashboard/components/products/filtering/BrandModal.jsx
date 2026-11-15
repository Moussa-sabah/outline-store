import Category from "./Category";

export default function ({changeBrand}) {
    return (

        <main className="pt-1 absolute">
            <div className="  shadow-2xl z-10 flex flex-col gap-3 p-3 font-semibold  bg-buttons text-white w-35 rounded-lg">
                <Category category='Nike'  change={changeBrand}/>
                <Category category='Air Jordan'  change={changeBrand}/>
                <Category category='Adidas' change={changeBrand} />
                <Category category='New Balance'  change={changeBrand}/>
                <Category category='Skechers'  change={changeBrand}/>
            </div>
        </main>


    )
}