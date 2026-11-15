
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Filter from './Filter'
export default function Header() {

    return (

        <div className="flex items-center justify-between px-4 text-sm h-9">
            <p className="text-2xl font-semibold">Orders</p>
            <Filter/>
                    <button className="border border-borders rounded-full h-8 w-8 hover:border-secondary cursor-pointer flex items-center justify-center">
                        <FontAwesomeIcon icon={faArrowsRotate} className="w-4 h-4 text-secondary " />
                    </button>

        </div>


    )
}