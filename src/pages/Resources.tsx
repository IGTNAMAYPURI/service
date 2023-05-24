import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { inject } from 'mobx-react'
import instance from '../api/axios';
import { AppStoreType } from '../store/appStore';
import Loading from '../components/Loading';

const Resources: React.FC<{ store?: AppStoreType }> = inject('store')(({ store }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const response = await instance.get("/resources", { signal: controller.signal });
                setError("")
                if (store)
                    store.resources = response.data;
            } catch (error: any) {
                console.error(error);
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        })()
        return () => {
            controller.abort()
        }
    }, [store])


    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className='mx-auto px-4 sm:px-8'>
            <div className='py-8'>
                <h2 className="text-2xl font-semibold leading-tight">Resources</h2>
            </div>
            <ul className="space-y-1 flex gap-4 flex-wrap">
                {store?.resources.map(((resource: string, i: number) => {
                    return (
                        <li key={i} className='w-36'> <Link to={`/raw/resources/${resource}`} className='hover:text-gray-400'>
                            {resource}
                        </Link></li>
                    )
                }))}
            </ul>
        </div>
    );
});

export default Resources;
