'use client'
import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { getUploadUrl, uploadProduct } from './actions';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductType, productSchema } from './schema';

export default function AddProduct() {
    const [preview, setPreview] = useState('');
    const [uploadUrl, setUploadUrl] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const { register, handleSubmit, formState: { errors }, setValue, setError } = useForm<ProductType>({
        resolver: zodResolver(productSchema)
    });




    const onSubmit = handleSubmit(async (data: ProductType) => {
        //upload image to cloudflare
        if (!file) return;
        const cloudflareForm = new FormData();
        cloudflareForm.append('file', file);
        const response = await fetch(uploadUrl, { method: 'post', body: cloudflareForm });
        if (response.status !== 200) {
            return;
        }

        //replace 'photo' in formData
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('price', data.price + "")
        formData.append('description', data.description)
        formData.append('photo', data.photo);
        // call upload product
        const errors = await uploadProduct('', formData);
        if (errors) {
            // setError();
        }

    })

    const onValid = async () => {
        await onSubmit();
    }

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
        setFile(file);
        const { success, result } = await getUploadUrl();
        if (success) {
            const { id, uploadURL } = result;
            setValue('photo', `https://imagedelivery.net/gVd53M-5CbHwtF6A9rt30w/${id}`)
            setUploadUrl(uploadURL);
        }
    }


    return <div>
        <form action={onValid} className="p-5 flex flex-col gap-5">
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
                            {errors.photo?.message}
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
            <Input {...register('title')} required placeholder="제목" type="text" errors={[errors.title?.message ?? '']} />
            <Input {...register('price')} type="number" required placeholder="가격" errors={[errors.price?.message ?? ""]} />
            <Input
                {...register('description')}
                type="text"
                required
                placeholder="자세한 설명"
                errors={[errors.description?.message ?? '']}
            />
            <Button text="작성 완료" />
        </form>
    </div>
}