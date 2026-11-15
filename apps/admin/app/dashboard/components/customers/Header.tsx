
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    refresh: () => void
}

export default function Header({ refresh }: Props) {
    return (
        <main className="flex flex-col justify-center text-sm h-1/10">
            <div className="flex items-center justify-between  ">
                <p className="text-2xl font-semibold">Customers</p>



                <button onClick={refresh} className="border border-borders rounded-full h-8 w-8 hover:border-secondary cursor-pointer flex items-center justify-center">
                    <FontAwesomeIcon icon={faArrowsRotate} className="w-4 h-4 text-secondary " />
                </button>

            </div>



        </main>
    )
}