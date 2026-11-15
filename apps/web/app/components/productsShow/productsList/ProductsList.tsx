

import { Product } from "@repo/types";
import ProductElement from "./ProductElement";

interface Props {
    products: Product[]
}

export default function ProductsList({ products }: Props) {


    return (
        <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-10 md:gap-x-7 gap-y-8 md:gap-13 lg:gap-5 xl:gap-10  w-full">
            {products?.map((product) =>
                <ProductElement key={product.id} product={product} />
            )}


        </main>
    )
}