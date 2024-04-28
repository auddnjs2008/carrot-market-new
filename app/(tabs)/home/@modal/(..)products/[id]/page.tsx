import ModalBackButton from '@/components/modal-back-button';
import db from '@/lib/db';
import { formatToWon } from '@/lib/utils';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const delay = () => new Promise((resolve) => { setTimeout(resolve, 100000) })

export default async function Modal({ params }: { params: { id: string } }) {

    const product = await db.product.findUnique({
        where: {
            id: +params.id
        },
    })


    return <div className="absolute w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-60 left-0 top-0">
        <ModalBackButton />
        <div className='max-w-screen-sm h-1/2  flex justify-center w-full'>
            <div className='aspect-square  overflow-hidden relative bg-neutral-700 text-neutral-200  rounded-lg flex justify-center items-center'>
                <PhotoIcon className='h-28' />
                <Image fill className='object-cover ' src={`${product?.photo}/width=112,height=112`} alt='product Imate' />
            </div>
            <>
                <div className="p-5 space-y-10">
                    <h1 className="text-2xl font-semibold">{product?.title}</h1>
                    <p>{product?.description}</p>
                    <p className='text-blue-500'>{product && formatToWon(product.price)}원</p>
                </div>
            </>
        </div>
    </div>
}