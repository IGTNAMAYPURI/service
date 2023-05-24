import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { inject } from 'mobx-react'
import instance from '../api/axios';
import { AppStoreType } from '../store/appStore';
import Loading from '../components/Loading';


const Applications: React.FC<{ store?: AppStoreType }> = inject('store')(({ store }): JSX.Element => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const response = await instance.get("/applications", { signal: controller.signal });
                setError("")
                if (store)
                    store.applications = response.data;
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
        return <Loading/>
    }

    if (error) {
        return <div>{error}</div>
    }


    return (
        <div className='mx-auto px-4 sm:px-8'>
            <div className='py-8'>
                <h2 className="text-2xl font-semibold leading-tight">Applications</h2>
            </div>
            <ul className="space-y-1 flex gap-4 flex-wrap">
                {store?.applications.map(((application: string, i: number) => {
                    return (
                        <li key={i} className='w-36'> <Link to={`/raw/applications/${application}`} className='hover:text-gray-400'>
                            {application}
                        </Link></li>

                    )
                }))}
            </ul>
        </div>
    );
});

export default Applications;
