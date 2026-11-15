

import React from 'react'

export default function ProductInformations() {
    return (
        <div className=" flex-1 flex flex-col gap-4   rounded-2xl">
            <div className='flex flex-col gap-1'>
                <p className='font-semibold'>Title</p>
                <p className=" ">Nike Initoar Class 2.2</p>
            </div>
            <hr className="text-borders" />
            <div className="flex items-center gap-8">
                <div className='flex flex-col gap-1'>
                    <p className='font-semibold'>Original Price</p>
                    <p className=""> $125.00</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='font-semibold'>Discount</p>
                    <p className=""> $125.00</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='font-semibold'>Final Price</p>
                    <p className=""> $125.00</p>
                </div>

            </div>
            <hr className="text-borders" />

            <div className="flex flex-col gap-2">
                <p className="font-semibold">Colors</p>
                <div className="flex items-center gap-2">

                    <p className="h-7 w-7 rounded-full bg-[#f3f4f2] border  border-secondary "></p>

                    <p className="h-7 w-7 rounded-full bg-[#965d5d] border  border-secondary"></p>
                    <p className="h-7 w-7 rounded-full bg-[#ffff] border  border-secondary"></p>
                </div>
            </div>
            <hr className="text-borders" />
            <div className="flex flex-col gap-2 w-10/12">
                <p className="font-semibold">Sizes</p>
                <div className="flex flex-wrap  text-sm   gap-1">

                    <p className=" border border-borders  text-center p-2 rounded-md  transition-all hover:bg-buttons hover:text-white flex flex-col items-center gap-1"><span>Size:37</span>  <span>Qty:20</span></p>
                    <p className=" border border-borders  text-center p-2 rounded-md  transition-all hover:bg-buttons hover:text-white flex flex-col items-center gap-1"><span>Size:37</span>  <span>Qty:20</span></p>
                    <p className=" border border-borders  text-center p-2 rounded-md  transition-all hover:bg-buttons hover:text-white flex flex-col items-center gap-1"><span>Size:37</span>  <span>Qty:20</span></p>
                    <p className=" border border-borders  text-center p-2 rounded-md  transition-all hover:bg-buttons hover:text-white flex flex-col items-center gap-1"><span>Size:37</span>  <span>Qty:20</span></p>
                    <p className=" border border-borders  text-center p-2 rounded-md  transition-all hover:bg-buttons hover:text-white flex flex-col items-center gap-1"><span>Size:37</span>  <span>Qty:20</span></p>
                    <p className=" border border-borders  text-center p-2 rounded-md  transition-all hover:bg-buttons hover:text-white flex flex-col items-center gap-1"><span>Size:37</span>  <span>Qty:20</span></p>
                    <p className=" border border-borders  text-center p-2 rounded-md  transition-all hover:bg-buttons hover:text-white flex flex-col items-center gap-1"><span>Size:37</span>  <span>Qty:20</span></p>
                    <p className=" border border-borders  text-center p-2 rounded-md  transition-all hover:bg-buttons hover:text-white flex flex-col items-center gap-1"><span>Size:37</span>  <span>Qty:20</span></p>
                    <p className=" border border-borders  text-center p-2 rounded-md  transition-all hover:bg-buttons hover:text-white flex flex-col items-center gap-1"><span>Size:37</span>  <span>Qty:20</span></p>
                </div>

            </div>
            <hr className="text-borders" />
            <div className="flex flex-col gap-1 w-10/12">
                <p className="font-semibold">Description</p>
                <p className=" text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia ducimus cum, enim corrupti vitae ratione repellendus pariatur animi repudiandae, molestiae quam officia facilis consequuntur nobis consectetur deleniti eaque blanditiis omnis?</p>
            </div>
        </div>
    )
}
