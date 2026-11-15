import Category from './Category'

export default function ({changeCollection}) {
    return (
        <main className='pl-4 absolute top-0 left-full'>
            <div className=" flex flex-col gap-3 p-3 font-semibold bg-buttons  rounded-lg w-50">
                <Category category='Sport & Performance' change={changeCollection}/>
                <Category category='Casual & Streetwear' change={changeCollection}/>
                <Category category='Formal & Dress' change={changeCollection}/>
            </div>
        </main>
    )
}