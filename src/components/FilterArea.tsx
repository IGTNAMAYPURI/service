import React from "react"
import Dropdown from "./Dropdown"
import { AppStoreType, FilterInputType } from "../store/appStore"

import { inject, observer } from 'mobx-react'

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";



const validationSchema = Yup.object().shape({
    cost: Yup.object().nullable().shape({
        min: Yup.number().nullable().min(0, "Min cost must be greater than or equal to 0"),
        max: Yup.number().nullable().moreThan(Yup.ref("min"), "Max cost must be greater than min cost"),
    }),
    quantity: Yup.object().nullable().shape({
        min: Yup.number().nullable().min(0, "Min quantity must be greater than or equal to 0"),
        max: Yup.number().nullable().moreThan(Yup.ref("min"), "Max quantity must be greater than min quantity"),
    }),
    date: Yup.string().nullable().required("Date is required"),
});

const FilterArea: React.FC<{ store?: AppStoreType }> = inject('store')(observer(({ store }) => {
    const filterInput: FilterInputType = {
        cost: {
            min: 0,
            max: 0,
        },
        quantity: {
            min: 0,
            max: 0,
        },
        date: ''
    }

    return (
        <div className="my-2 flex sm:flex-row flex-col">
            <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 fill-current text-gray-500"
                    >
                        <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                    </svg>
                </span>
                <input
                    onChange={(e) => store?.setFilterText(e.target.value)}
                    value={store?.filterText}
                    placeholder="Search"
                    className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                />
            </div>
            <div className="flex flex-row mb-1 sm:mb-0">
                <div className="flex items-center justify-center">
                    {/* Dropdown */}
                    <Dropdown buttonText='Filter'>
                        <div className="bg-white shadow p-4">
                            <h3 className="text-lg font-medium mb-2">Filter</h3>
                            {/* Formik Form */}
                            <Formik
                                initialValues={filterInput}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    store?.setFilter(values)
                                }}
                            >
                                <Form className="grid grid-cols-1 gap-4">
                                    {/* Cost Filter */}
                                    <div>
                                        <label htmlFor="costMin" className="block text-sm font-medium">
                                            Cost (Min-Max)
                                        </label>
                                        <div className="flex items-center">
                                            <Field
                                                type="text"
                                                id="costMin"
                                                name="cost.min"
                                                placeholder="Min"
                                                className="w-1/2 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                            />
                                            <Field
                                                type="text"
                                                id="costMax"
                                                name="cost.max"
                                                placeholder="Max"
                                                className="w-1/2 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <ErrorMessage name="cost.min" component="div" className="text-red-500" />
                                        <ErrorMessage name="cost.max" component="div" className="text-red-500" />
                                    </div>
                                    {/* Quantity Filter */}
                                    <div>
                                        <label htmlFor="quantityMin" className="block text-sm font-medium">
                                            Quantity (Min-Max)
                                        </label>
                                        <div className="flex items-center">
                                            <Field
                                                type="text"
                                                id="quantityMin"
                                                name="quantity.min"
                                                placeholder="Min"
                                                className="w-1/2 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                            />
                                            <Field
                                                type="text"
                                                id="quantityMax"
                                                name="quantity.max"
                                                placeholder="Max"
                                                className="w-1/2 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                            />
                                        </div>
                                        <ErrorMessage name="quantity.min" component="div" className="text-red-500" />
                                        <ErrorMessage name="quantity.max" component="div" className="text-red-500" />
                                    </div>
                                    {/* Date Filter */}
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium">
                                            Date
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type="text"
                                                id="date"
                                                name="date"
                                                placeholder="Enter date"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                            />
                                            <ErrorMessage name="date" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                    {/* Apply Button */}
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                                        >
                                            Apply Filters
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => store?.setFilter(null)}
                                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}));

export default FilterArea;