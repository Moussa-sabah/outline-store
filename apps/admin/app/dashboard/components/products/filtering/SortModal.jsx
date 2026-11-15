import Category from "./Category";

export default function ({ changeSort }) {
    return (

        <main className="pt-1 absolute">
            <div className="   flex flex-col top-full   gap-3 p-3 font-semibold bg-primary text-white w-40 rounded-lg">
                <Category category='Newest' change={changeSort} />
                <Category category='Featured' change={changeSort} />
                <Category category='Price: High-Low' change={changeSort} />
                <Category category='Price: Low-High' change={changeSort} />
            </div>
        </main>

    )
}