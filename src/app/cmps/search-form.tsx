import { ISearchProps } from './app-header'
import { FaSearch } from 'react-icons/fa'
import React, { useEffect, useRef, useState } from 'react'

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

    const getInputValues = (module: { name: string; placeholder: string }): string | number => {
        const formatDate = (date: Date): string => {
            // Shows like this: Mar 7
            return date.toLocaleString('default', { month: 'short', day: 'numeric' })
        }
        if (module.name === 'startDate' && filterBy.startDate) return formatDate(filterBy.startDate)
        else if (module.name === 'endDate' && filterBy.endDate) return formatDate(filterBy.endDate)
        else if (module.name === 'location' && filterBy.destination) return filterBy.destination
        else if (module.name === 'guests' && filterBy.guests) return filterBy.guests
        else return ''
    }

    const handleClick = (ev: React.MouseEvent<HTMLLabelElement>, moduleName: string) => {
        if (activeModule !== moduleName) onChangeModule(moduleName)
    }

    function handleBlur() {
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
            <form ref={formRef} onBlur={handleBlur} className='search-form'>
                {modules.map(module => (
                    <div
                        className={`module-container ${module.name} ${
                            activeModule && module.name === activeModule ? 'active' : ''
                        }`}
                        key={`m-${module.name}`}
                    >
                        <label className='module' onClick={ev => handleClick(ev, module.name)}>
                            <span className='module-title'>{module.label}</span>
                            <input
                                type={'text'}
                                name={module.name}
                                readOnly={module.name !== 'location'}
                                className={`module-selection`}
                                defaultValue={getInputValues(module)}
                                placeholder={module.placeholder}
                            />
                            <button className='module-reset-btn'>X</button>
                        </label>
                        {module.name === 'guests' && (
                            <button className='form-search-btn' type='button'>
                                <FaSearch />
                                {activeModule && 'Search'}
                            </button>
                        )}
                    </div>
                ))}
            </form>
        </div>
    )
}
