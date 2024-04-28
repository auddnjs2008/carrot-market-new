'use client'
import { useFormStatus } from 'react-dom';

interface ButtonProps {
    text: string;
}


export default function Button({ text }: ButtonProps) {

    /**
     * form이 작성된 컴포넌트에서는 사용할 수 없다.
     * 자신의 부모 컴포넌트를 보고, 가장 가까운 form을 찾으려고 한다.
     */
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} className='primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed'>{pending ? "Loading..." : text}</button>
    )
}