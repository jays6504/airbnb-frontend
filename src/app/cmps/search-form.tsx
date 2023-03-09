import { ISearchProps } from './app-header'
import React, { useEffect, useRef, useState } from 'react'
import { SearchModule } from './search-module'
import { SearchModuleExtension } from './search-module-extension'

export function SearchForm({ activeModule, onChangeModule, searchBy, onSetSearchBy }: ISearchProps) {
    const modules = [
        { name: 'location', extension: 'location', label: 'Where', placeholder: 'Search destinations' },
        { name: 'startDate', extension: 'datepicker', label: 'Check in', placeholder: 'Add dates' },
        { name: 'guests', extension: 'guests', label: 'Who', placeholder: 'Add guests' },
    ]
    const searchModuleProps = (module: { name: string; label: string; placeholder: string }) => ({
        onChangeModule,
        activeModule,
        searchBy,
        name: module.name,
        label: module.label,
        placeholder: module.placeholder,
    })

    return (
        <form className='search-form'>
            {modules.map(module => (
                <div className={`module-container ${module.name}`} key={`m-${module.name}`}>
                    <SearchModule {...searchModuleProps(module)} />
                    {module.name === 'startDate' && (
                        <SearchModule {...searchModuleProps(module)} name={'endDate'} label={'Check out'} />
                    )}
                    {((module.extension === 'datepicker' && activeModule === 'endDate') ||
                        (module.extension === 'datepicker' && activeModule === 'startDate') ||
                        activeModule === module.extension) && (
                        <SearchModuleExtension
                            activeModule={activeModule}
                            searchBy={searchBy}
                            onSetSearchBy={onSetSearchBy}
                        />
                    )}
                </div>
            ))}
        </form>
    )
}
