import { GoHeart, GoHeartFill } from "react-icons/go";
import { FiBox } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Product } from "@repo/types";
import { useCustomerStore } from "@/stores/customer_store";
import Link from "next/link";


interface Props {
    product: Product
}

export default function ProductInformations({ product }: Props) {

    const wishlistItemsForCurrentUser = useCustomerStore(state => state.currentUser?.wishlist)
    const wishlistItems = useCustomerStore(state => state.wishlistItems)
    const addProductToWishlist = useCustomerStore(state => state.addProductToWishlist)
    async function handleAddProductToWishlist() {
        const response = await addProductToWishlist(product.id)
        console.log(response.message)
    }

    function handleWhatsappOrdrt() {
        const phoneNumber = "9647819100688";

        const message = `مرحباً Outline، أرغب في شراء هذه الساعة:
    - المنتج: ${product?.title}
    - السعر: ${product?.final_price} د.ع
    
    ----------------
    الرابط المباشر للمنتج:
    ${window.location.origin}/product-details/${product?.id}`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
    }

    return (
        <div className="w-full flex-1 flex flex-col gap-4 md:gap-6  lg_xl:gap-8 lg_xl:border  border-borders lg_xl:p-8 rounded-2xl ">
            <p
                className="  text-xs sm:text-[13px] md:text-[16px]  capitalize "> {product.gender === 'women' ? 'نسائي' : product.gender === 'men' ? 'رجالي' : 'أطفال'} / {product.brand}
            </p>

            <h1 className="text-2xl md:text-3xl  font-semibold">{product?.title}</h1>

            <div className="flex items-center gap-4">
                <p className="text-2xl md:text-3xl font-semibold ">{product?.final_price.toLocaleString('en-US')} د.ع</p>
                {product.discount !== 0 && <>    <p className="text-lg md:text-xl opacity-50 line-through">{product?.original_price.toLocaleString('en-US')}</p>
                    <p className="text-xs md:text-sm bg-white text-[#00cc2c] border border-[#00cc2c] px-2 py-0.5 rounded-full font-semibold">حفظ {product?.discount}%</p></>}
            </div>
            <div className="text-secondary  text-sm flex items-center gap-1 font-semibold">
                <FiBox className="md:text-[16px]" />
                <p>القطع المتبقية:<span className="text-primary "> {product?.quantity} </span></p>
            </div>


            <div className="flex flex-col gap-1">
                <p ><span className="font-semibold">لون المينا والسير: </span>{product?.color}</p>
                <p ><span className="font-semibold">الحجم: </span>{product?.size}mm</p>
                <p ><span className="font-semibold">نوع السير: </span>{product?.strap_material}</p>
                <p ><span className="font-semibold">مقاومة الماء: </span> {product?.waterproof}ATM</p>
                <p ><span className="font-semibold">نوع الحركة: </span> {product?.movement}</p>
            </div>

            <div className="flex gap-2 md:gap-5 text-[15px] md:text-lg">
                <button onClick={handleWhatsappOrdrt} className="flex-1 bg-primary text-white rounded-md py-2    hover:opacity-80 transition-all flex items-center justify-center gap-2  ">
                    اطلبها الآن
                    <FaWhatsapp className="text-lg" />
                </button>
                <button onClick={handleAddProductToWishlist} className="flex-1 bg-white border-secondaryButtons font-semibold border py-2 rounded-lg  cursor-pointer   hover:border-primary transition-all flex items-center justify-center gap-3 ">
                    إضافة للمفضلة
                    {wishlistItemsForCurrentUser?.includes(product?.id) || wishlistItems.includes(product?.id) ? <GoHeartFill className="text-lg  text-redColor" /> : <GoHeart className=" text-lg  text-redColor " />}
                </button>

            </div>

            {product?.description && <div className="flex flex-col gap-2 md:w-10/12">
                <p className="font-semibold">تفاصيل المنتج</p>
                <p className=" text-sm md:text-[16px]">{product?.description}</p>
            </div>}
        </div>
    )
}
