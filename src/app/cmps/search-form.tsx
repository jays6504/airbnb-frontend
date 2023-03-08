import { ISearchProps } from './app-header'
import React, { useEffect, useRef, useState } from 'react'
import { SearchModule } from './search-module'
import { SearchModuleExtension } from './search-module-extension'

export function SearchForm({ activeModule, onChangeModule, filterBy, isExpandedClass }: ISearchProps) {
    const modules = [
        { name: 'location', label: 'Where', placeholder: 'Search destinations' },
        { name: 'startDate', label: 'Check in', placeholder: 'Add dates' },
        { name: 'endDate', label: 'Check out', placeholder: 'Add dates' },
        { name: 'guests', label: 'Who', placeholder: 'Add guests' },
    ]

    return (
        <form className='search-form'>
            {modules.map(module => (
                <div
                    className={`module-container ${module.name} ${
                        activeModule && module.name === activeModule ? 'active' : ''
                    }`}
                    key={`m-${module.name}`}
                >
                    <SearchModule
                        onChangeModule={onChangeModule}
                        activeModule={activeModule}
                        filterBy={filterBy}
                        name={module.name}
                        label={module.label}
                        placeholder={module.placeholder}
                    />
                    {activeModule && module.name === activeModule && (
                        <SearchModuleExtension activeModule={activeModule} />
                    )}
                </div>
            ))}
        </form>
    )
}
