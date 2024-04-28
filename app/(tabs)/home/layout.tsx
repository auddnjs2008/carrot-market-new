import React from 'react';

interface Props {
    children: React.ReactNode;
    modal: React.ReactNode;
}

export default function HomeLayout({ children, modal }: Props) {

    return <>
        {children}
        {modal}
    </>

}