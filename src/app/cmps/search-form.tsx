import { ISearchProps } from './app-header'
import React, { useEffect, useRef, useState } from 'react'
import { Module } from './module'

export function SearchForm({ activeModule, onChangeModule, filterBy, isExpandedClass }: ISearchProps) {
    const formRef = useRef<HTMLFormElement>(null)
    const [isMouseDown, setIsMouseDown] = useState(false)

    useEffect(() => {
        if (activeModule && formRef.current) {
            const inputElement = formRef.current.querySelector<HTMLInputElement>(`[name="${activeModule}"]`)
            if (inputElement) {
                inputElement.focus()
            }
        }
    }, [activeModule])

    const modules = [
        { name: 'location', label: 'Where', placeholder: 'Search destinations' },
        { name: 'startDate', label: 'Check in', placeholder: 'Add dates' },
        { name: 'endDate', label: 'Check out', placeholder: 'Add dates' },
        { name: 'guests', label: 'Who', placeholder: 'Add guests' },
    ]

    function handleFormBlur() {
        if (!isMouseDown) {
            onChangeModule(null)
        }
    }

    function handleMouseDown() {
        setIsMouseDown(true)
    }

    function handleMouseUp() {
        setIsMouseDown(false)
    }

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className={`search-form-container ${isExpandedClass} ${!activeModule ? 'blured' : ''}`}
        >
            <form ref={formRef} onBlur={handleFormBlur} className='search-form'>
                {modules.map(module => (
                    <div
                        className={`module-container ${module.name} ${
                            activeModule && module.name === activeModule ? 'active' : ''
                        }`}
                        key={`m-${module.name}`}
                    >
                        <Module
                            onChangeModule={onChangeModule}
                            activeModule={activeModule}
                            filterBy={filterBy}
                            name={module.name}
                            label={module.label}
                            placeholder={module.placeholder}
                        />
                    </div>
                ))}
            </form>
        </div>
    )
}
