'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ProductType, productSchema } from '../../product-add/schema';
import { getUploadUrl, uploadProduct } from '../../product-add/actions';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Input from '@/components/input';
import Button from '@/components/button';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';

export default function FixProduct(params: { params: { id: string } }) {

    const [preview, setPreview] = useState('');
    const [uploadUrl, setUploadUrl] = useState('');
    const [photoId, setImageId] = useState("");
    // const [file, setFile] = useState<File | null>(null);

    const interceptAction = async (prevState: any, formData: FormData) => {
        //upload image to cloudflare
        const file: any = formData.get('photo');
        if (!file || file.size === 0) return;
        const cloudflareForm = new FormData();
        cloudflareForm.append('file', file);
        const response = await fetch(uploadUrl, { method: 'post', body: cloudflareForm });
        if (response.status !== 200) {
            return;
        }

        const photoUrl = `https://imagedelivery.net/aSbksvJjax-AUC7qVnaC4A/${photoId}`;
        formData.set("photo", photoUrl);
        return uploadProduct(prevState, formData);
    }

    const [state, action] = useFormState(interceptAction, null);


    const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = event;
        if (!files) {
            return;
        }
        const file = files[0];
        if (file.type !== 'image/png' || file.size >= 1000000 * 3) {
            return;
        }
        const url = URL.createObjectURL(file);
        setPreview(url);
        // setFile(file);
        const { success, result } = await getUploadUrl();
        if (success) {
            const { id, uploadURL } = result;
            setImageId(id);
            // setValue('photo', `https://imagedelivery.net/gVd53M-5CbHwtF6A9rt30w/${id}`)
            setUploadUrl(uploadURL);
        }
    }

    return <div>
        <form action={action} className="p-5 flex flex-col gap-5">
            <label
                htmlFor="photo"
                className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer
            bg-center bg-cover
            "
                style={{ backgroundImage: `url(${preview})` }}
            >
                {
                    preview === '' ? <> <PhotoIcon className="w-20" />
                        <div className="text-neutral-400 text-sm">
                            사진을 추가해주세요.
                            {state?.fieldErrors.photo}
                        </div></> : ''
                }
            </label>
            <input
                onChange={onImageChange}
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                className="hidden"
            />
            <Input name='title' required placeholder="제목" type="text" errors={state?.fieldErrors.title} />
            <Input name='price' type="number" required placeholder="가격" errors={state?.fieldErrors.price} />
            <Input
                name='description'
                type="text"
                required
                placeholder="자세한 설명"
                errors={state?.fieldErrors.description}
            />
            <Button text="작성 완료" />
        </form>
    </div>
}