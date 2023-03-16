import { IStayPreview } from '../../../../interfaces/stay'
import GoogleMapReact from 'google-map-react'
import { forwardRef, HTMLAttributes, MutableRefObject, useMemo, useRef, useState } from 'react'
import { StayPreview } from '../stay.preview'
import { MapMarker } from './map-marker'
import { MapPreviewContainer } from './map-preview-container'

interface Props {
    stays: IStayPreview[]
    onAddToWishlist: () => void
    onStayClick: (stayId: string) => void
}

enum Visibility {
    Visible = 'visible',
    Hidden = 'hidden',
}

export function StayMap({ stays, onAddToWishlist, onStayClick }: Props) {
    const markers = useMemo(() => {
        return stays.map((stay, idx) => ({
            lat: stay.loc.lat,
            lng: stay.loc.lng,
            price: currencySign + stay.price.toLocaleString(),
            _id: stay._id,
            idx,
        }))
    }, [stays])
    // Preview stay states and data
    const [stayToPreview, setStayToPreview] = useState<IStayPreview | null>(null)
    const [elSelectedMarker, setElCurrentMarker] = useState<HTMLDivElement | null>(null)
    const elPreviewContainer = useRef<HTMLDivElement>(null)
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
        console.log('asdasd:')
        if (!elSelectedMarker) return { left: 0, visibility: Visibility.Hidden }

        const { left, width } = elSelectedMarker.getBoundingClientRect()
        if (isNaN(left) || isNaN(width)) return { left: 0, visibility: Visibility.Hidden }

        return {
            left: left + width / 2,
            visibility: stayToPreview ? Visibility.Visible : Visibility.Hidden,
        }
    }

    return (
        <div className='index-map full'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={{
                    styles: mapStyles,
                    center: defaultProps.center,
                    zoom: defaultProps.zoom,
                }}
            >
                {markers.map((marker, idx) => (
                    <MapMarker
                        handleClick={onMarkerClick}
                        idx={idx}
                        key={marker._id}
                        lat={marker.lat}
                        lng={marker.lng}
                        isActive={stayToPreview?._id === marker._id}
                    >
                        <span>{marker.price}</span>
                    </MapMarker>
                ))}
                {stayToPreview && elSelectedMarker ? (
                    <MapPreviewContainer
                        lat={stayToPreview?.loc.lat || 0}
                        lng={stayToPreview?.loc.lng || 0}
                        ref={elPreviewContainer}
                        containerStyles={previewContainerStyles()}
                    >
                        <div>
                            <StayPreview
                                onAddToWishlist={onAddToWishlist}
                                stay={stayToPreview}
                                isMapView={true}
                                onStayClick={onStayClick}
                            />
                        </div>
                    </MapPreviewContainer>
                ) : null}
            </GoogleMapReact>
        </div>
    )
}
// Map setup and data
const apiKey = 'AIzaSyAQdtY3afjXx7DgdmDjBYzKoLAVDUFdztw'
const defaultProps = {
    center: {
        lat: 37.7749,
        lng: -122.4194,
    },
    zoom: 2,
}
const currencySign = '$'

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
