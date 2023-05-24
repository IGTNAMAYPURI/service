import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react'
import instance from '../api/axios';
import { AppStoreType, RawData } from '../store/appStore';
import FilterArea from '../components/FilterArea';
import Loading from '../components/Loading';

const Raw: React.FC<{ store?: AppStoreType }> = inject('store')(observer(({ store }) => {
    const { type, key } = useParams();
    const { filteredData } = store || {}
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async ({ signal, path }: { signal: AbortSignal, path: string }) => {
            try {
                const response = await instance.get(path, { signal });
                setError("")
                if (store) {
                    store.setRaw(response.data)
                    store.setCurrentPage(1)
                }
            } catch (error: any) {
                console.error(error);
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData({ signal: controller.signal, path: type ? `/${type}/${key}` : "/raw" })
        return () => {
            controller.abort()
        }
    }, [store, type, key])



    if (isLoading) {
        return<Loading/>
    }

    if (error) {
        return <div>{error}</div>
    }


    return (
        <>
            {/* component */}
            <div className="mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div>
                        <h2 className="text-2xl font-semibold leading-tight">Invoices</h2>
                    </div>
                    <FilterArea />
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Consumed Quantity
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Cost
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            MeterCategory
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            ResourceGroup
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            ServiceName
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            UnitOfMeasure
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{filteredData?.map((r: RawData, i: number) => {
                                    return <tr key={i}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{r.ConsumedQuantity}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {r.Cost}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {r.Date}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {r.Location}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {r.MeterCategory}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {r.ResourceGroup}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {r.ServiceName}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {r.UnitOfMeasure}
                                            </p>
                                        </td>
                                    </tr>
                                })}

                                </tbody>
                            </table>
                            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                                <span className="text-xs xs:text-sm text-gray-900">
                                    Showing {store ? store.currentPage * store.itemsPerPage - store.itemsPerPage + 1 : 0} to {store ? store.currentPage * store.itemsPerPage : 0} of {store?.totalPages} Entries
                                </span>
                                <div className="inline-flex mt-2 xs:mt-0">
                                    <button onClick={() => store?.setCurrentPage(store?.currentPage - 1)} className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                        Prev
                                    </button>
                                    <button onClick={() => store?.setCurrentPage(store?.currentPage + 1)} className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}));

export default Raw;
