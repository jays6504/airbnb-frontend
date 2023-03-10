import { IStayPreview } from '../../../interfaces/stay'
import GoogleMapReact from 'google-map-react'
import { forwardRef, HTMLAttributes, MutableRefObject, useRef, useState } from 'react'
import { StayPreview } from './stay.preview'

enum Visibility {
    Visible = 'visible',
    Hidden = 'hidden',
}
interface Props {
    stays: IStayPreview[]
    onAddToWishlist: () => void
}

interface IStayContainerProps extends HTMLAttributes<HTMLDivElement> {
    lat: number
    lng: number
    children: JSX.Element
    containerStyles: {
        left: string
        visibility: string
    }
    innerRef?: MutableRefObject<HTMLDivElement | null> | ((el: HTMLDivElement | null) => void)
}

interface MarkerProps extends HTMLAttributes<HTMLDivElement> {
    lat: number
    lng: number
    idx: number
    children: JSX.Element
    className?: string
    innerRef?: (el: HTMLDivElement | null) => void
    handleClick: (event: React.MouseEvent<HTMLDivElement>, idx: number) => void
}
// Map setup and data
const apiKey = 'AIzaSyB_EGN1HMBcl7uYM0IBR2jGP3-SGW3pznk'
const defaultProps = {
    center: {
        lat: 37.7749,
        lng: -122.4194,
    },
    zoom: 2,
}
const currencySign = '$'

export function StayMap({ stays, onAddToWishlist }: Props) {
    const markers = stays.map((stay, idx) => ({
        lat: stay.loc.lat,
        lng: stay.loc.lng,
        price: currencySign + stay.price.toLocaleString(),
        _id: stay._id,
        idx,
    }))
    function mapOptions() {
        return {
            styles: mapStyles,
        }
    }
    // Preview stay states and data
    const [stayToPreview, setStayToPreview] = useState<IStayPreview | null>(null)
    const [elSelectedMarker, setElCurrentMarker] = useState<HTMLDivElement | null>(null)
    const elPreviewContainer = useRef<HTMLDivElement>(null)
    console.log('stayToPreview:', stayToPreview)
    console.log('elPreviewContainer:', elPreviewContainer)
    console.log('elSelectedMarker:', elSelectedMarker)
    // Preview methods

    function onMarkerClick(event: React.MouseEvent<HTMLDivElement>, idx: number) {
        event.stopPropagation()
        event.preventDefault()
        const stay = stays[idx]
        if (stayToPreview?._id === stay._id) {
            // Clicked on the same marker twice, close the preview
            setStayToPreview(null)
        } else {
            // Clicked on a different marker, show the preview
            setStayToPreview(stay)
            setElCurrentMarker(event.currentTarget) // Update the current marker
        }
    }

    function previewContainerStyles() {
        if (!elSelectedMarker) return { left: '0px', visibility: Visibility.Hidden }
        return {
            left: `${elSelectedMarker?.offsetWidth / 2}px`,
            visibility: stayToPreview ? Visibility.Visible : Visibility.Hidden,
        }
    }

    const StayPreviewContainer = forwardRef<HTMLDivElement, IStayContainerProps>(
        ({ containerStyles, children, ...rest }, ref) => (
            <div {...rest} style={containerStyles as React.CSSProperties} ref={ref} className='map-stay-preview'>
                {children}
            </div>
        )
    )

    const Marker = ({ children, className, idx, handleClick }: MarkerProps) => (
        <div className={`marker-container ${className}`}>
            <div onClick={event => handleClick(event, idx)} className={`marker ${className}`}>
                {children}
            </div>
        </div>
    )

    return (
        <div className='index-map full'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={mapOptions()}
            >
                {markers.map((marker, idx) => (
                    <Marker
                        handleClick={onMarkerClick}
                        idx={idx}
                        key={marker._id}
                        lat={marker.lat}
                        lng={marker.lng}
                        className={stayToPreview?._id === marker._id ? 'active' : ''}
                    >
                        <span>{marker.price}</span>
                    </Marker>
                ))}
                {stayToPreview && (
                    <StayPreviewContainer
                        lat={stayToPreview?.loc.lat || 0}
                        lng={stayToPreview?.loc.lng || 0}
                        ref={elPreviewContainer}
                        containerStyles={previewContainerStyles()}
                    >
                        <div>
                            <StayPreview onAddToWishlist={onAddToWishlist} stay={stayToPreview} isMapView={true} />
                        </div>
                    </StayPreviewContainer>
                )}
            </GoogleMapReact>
        </div>
    )
}

const mapStyles = [
    {
        featureType: 'administrative.land_parcel',
        elementType: 'labels',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                lightness: 45,
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi.attraction',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'poi.business',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'poi.medical',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text',
        stylers: [
            {
                color: '#bae3c5',
            },
        ],
    },
    {
        featureType: 'poi.place_of_worship',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.local',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'labels',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'transit',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'transit.station.airport',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'transit.station.bus',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'transit.station.rail',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#b3e6f4',
            },
            {
                lightness: 5,
            },
            {
                visibility: 'on',
            },
        ],
    },
]
