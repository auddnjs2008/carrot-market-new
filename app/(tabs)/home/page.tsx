import ListProduct from '@/components/list-product';
import ProductList from '@/components/product-list';
import db from '@/lib/db';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Prisma } from '@prisma/client';
import { unstable_cache as nextCache, revalidatePath } from 'next/cache';
import Link from 'next/link';


const getCachedProducts = nextCache(
    getInitialProducts, ['home-products'], {
    tags: ['home-products']
}

)


async function getInitialProducts() {
    console.log('hit');
    const products = await db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true
        },
        // take: 1,
        orderBy: {
            created_at: 'desc'
        }
    });
    return products
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;


export const metadata = {
    title: 'Home'
}

// export const dynamic = 'force-dynamic';
export const revalidate = 60;

const ProductPage = async () => {
    const initialProducts = await getCachedProducts();
    const revalidate = async () => {
        'use server';
        revalidatePath('/home')
    }

    return <div>
        <ProductList initialProducts={initialProducts} />
        <form action={revalidate}>
            <button>revalidate</button>
        </form>
        <Link href='/product-add' className='bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400'>
            <PlusIcon className='size-10' />
        </Link>
    </div>

}

export default ProductPage;