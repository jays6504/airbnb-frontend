import { forwardRef, HTMLAttributes, MutableRefObject } from 'react'

type ContainerStyles = {
    [key in keyof React.CSSProperties]?: React.CSSProperties[key]
} & {
    left: number
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
    ({ containerStyles, children, ...rest }, ref) => (
        <div
            {...rest}
            style={{
                position: 'absolute',
                zIndex: 1,
                top: 0,
                ...containerStyles,
            }}
            ref={ref}
            className='map-stay-preview'
        >
            {children}
        </div>
    )
)
