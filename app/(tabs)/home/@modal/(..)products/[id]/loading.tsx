import ModalBackButton from '@/components/modal-back-button';
import { PhotoIcon } from '@heroicons/react/24/solid';

const ModalProductLoading = () => {


    return <div className="absolute w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-60 left-0 top-0">
        <ModalBackButton />

        <div className='max-w-screen-sm h-1/2  flex justify-center w-full'>
            <div className='aspect-square  overflow-hidden relative bg-neutral-700 text-neutral-200  rounded-lg flex justify-center items-center'>
                <PhotoIcon className='h-28' />
            </div>
            <>
                <div className="p-5 space-y-10 *:rounded-md">
                    <h1 className="text-2xl bg-neutral-700 animate-pulse font-semibold w-[100px] h-5"></h1>
                    <p className='w-[150px] h-5 bg-neutral-700 animate-pulse'></p>
                    <p className='text-blue-500 w-[200px] h-5 bg-neutral-700 animate-pulse'></p>
                </div>
            </>
        </div>
    </div>

}

export default ModalProductLoading;