
import { CiFacebook } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlinePhone } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {


    const phoneNumber = "9647819100688";

    const message = 'مرحباً Outline، لدي استفسار';

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;




    return (
        <main className=" flex items-center flex-col gap-10   text-primary border-t border-borders/60 px-5 sm:px-10 lg:px-20 py-10 ">
            <div className="flex flex-col items-center md:flex-row md:items-start  gap-6 md:gap-12">


                <div className=" flex items-center md:items-start flex-col gap-4">


                    <Image alt='' width={1000} height={1000}  src="/images/0x7v7Mb8DIDJ8Q4BYqRToX_1794457929545_na1fn_L2hvbWUvdWJ1bnR1L291dGxpbmUtbG9nby1jaXJjbGUtaWNvbi00NjQzNDEtdGlnaHQ.webp"  className="w-25  object-contain" />

                    <p className=" text-center md:text-start text-sm md:w-90">وجهتك الموثوقة لشراء الساعات الأصلية. تشكيلات مختارة بعناية لتناسب مختلف الأذواق .</p>
                </div>


                <div className="flex flex-col items-center md:items-start gap-2 md:gap-3">
                    <h1 className=" text-sm md:text-[16px] font-semibold ">تواصل معنا</h1>
                    <div className="flex flex-row md:flex-col gap-2 md:gap-3 text-[13px] ">
                        <div className="flex items-center gap-1 md:gap-2 border py-1 px-2 rounded-md border-borders/60"><AiOutlinePhone className="text-[16px]" />07819100688</div>

                        <Link href={whatsappUrl} target="_blank" className="flex items-center gap-1 md:gap-2 border py-1 px-2 rounded-md border-borders/60 cursor-pointer"> <FaWhatsapp className="text-[15px]" />واتساب</Link>
                    </div>

                </div>

                <div className="flex flex-col items-center md:items-start gap-2 md:gap-3">
                    <h1 className="text-sm md:text-[16px] font-semibold">تابعنا</h1>

                    <div className="flex flex-row md:flex-col gap-2 md:gap-3 text-[13px] ">
                        <Link href='https://www.facebook.com/share/1CMJaPN4CG/' target="_blank" className="flex items-center gap-1 md:gap-2 border py-1 px-2 rounded-md border-borders/60 cursor-pointer"><CiFacebook className="text-lg" />فيسبوك</Link>

                        <Link href='https://www.instagram.com/outline.store.iq?psln=ajE1MHpjem5qaWcw' target="_blank" className="flex items-center gap-1 md:gap-2 border rounded-md py-1 px-2 border-borders/60 cursor-pointer"><IoLogoInstagram className="text-[16px]" />انستغرام</Link>
                    </div>

                </div>


            </div>
            <div className="flex flex-col w-full items-center gap-3 ">
                <hr className="text-borders/40 w-full" />
                <p className=" text-[13px]">جميع الحقوق محفوظة لـ Outline Watches © 2026</p>
            </div>
        </main>
    )
}