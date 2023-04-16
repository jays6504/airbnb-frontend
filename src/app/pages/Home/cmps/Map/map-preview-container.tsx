import { forwardRef, HTMLAttributes, MutableRefObject } from 'react'

type ContainerStyles = {
    [key in keyof React.CSSProperties]?: React.CSSProperties[key]
} & {
    top?: number
    left?: string
    visibility: string
}

interface IStayContainerProps extends HTMLAttributes<HTMLDivElement> {
    lat: number
    lng: number
    children: JSX.Element
    containerStyles: ContainerStyles
    innerRef?: MutableRefObject<HTMLDivElement | null> | ((el: HTMLDivElement | null) => void)
}

export const MapPreviewContainer = forwardRef<HTMLDivElement, IStayContainerProps>(
    ({ containerStyles, children, lat, lng }, ref) => (
        <div
            style={{
                position: 'absolute',
                zIndex: 1,
                ...containerStyles,
            }}
            ref={ref}
            className='map-stay-preview'
        >
            {children}
        </div>
    )
)
