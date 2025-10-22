"use client"

import { useParams } from 'next/navigation';

const parant = () => {

    const { plan } = useParams();
    return plan
};

export default parant;