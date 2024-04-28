import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';

interface InputProps {
    errors?: string[];
    name: string;
}


const _Input = ({ errors = [], name, ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <div className='flex flex-col gap-2'>
            <input ref={ref} className='bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400'
                name={name}
                {...rest}
            />
            {errors.map((error, index) =>
                <span key={index} className='text-red-500 font-medium'>{error}</span>
            )}
        </div>
    )
}

export default forwardRef(_Input);