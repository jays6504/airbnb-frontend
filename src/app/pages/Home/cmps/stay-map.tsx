import { IStayPreview } from '../../../interfaces/stay'
import GoogleMapReact from 'google-map-react'
import { HTMLAttributes, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { StayPreview } from './stay.preview'

enum Visibility {
    Visible = 'visible',
    Hidden = 'hidden',
}
interface Props {
    stays: IStayPreview[]
    onAddToWishlist: () => void
}

interface MarkerProps extends HTMLAttributes<HTMLDivElement> {
    lat: number
    lng: number
    idx: number
    children: ReactNode
    className?: string
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

    // Preview stay states and data
    const [stayToPreview, setStayToPreview] = useState<IStayPreview | null>(null)
    const [elSelectedMarker, setElCurrentMarker] = useState<HTMLDivElement | null>(null)
    const elPreviewContainer = useRef<HTMLDivElement | null>(null)
    const [isZoomDisabled, setIsZoomDisabled] = useState<boolean>(false)

    const onRefChange = useCallback(
        (markerNode: HTMLDivElement | null, idx: number) => {
            if (markerNode !== null) {
                // Marker ref changed and exists
                if (stayToPreview?._id === markers[idx]._id) {
                    setElCurrentMarker(markerNode)
                }
            }
            // Else unmounted marker ref
        },
        [stayToPreview, markers]
    )

    function handleMapClick() {
        setStayToPreview(null)
    }

    function mapOptions() {
        return {
            styles: mapStyles,
            disableDoubleClickZoom: isZoomDisabled ? true : false,
        }
    }
    // Preview methods

    function onMarkerClick(event: React.MouseEvent<HTMLDivElement>, idx: number) {
        event.stopPropagation()
        const stay = stays[idx]
        setStayToPreview(stay)
    }

    function onPreviewClick(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
    }

    function handlePreviewMouseEnter() {
        setIsZoomDisabled(true)
    }

    function handlePreviewMouseLeave() {
        setIsZoomDisabled(false)
    }

    function previewContainerStyles() {
        return {
            left: `${elSelectedMarker?.offsetWidth ?? 0 / 2}px`,
            visibility: stayToPreview ? Visibility.Visible : Visibility.Hidden,
        }
    }

    // const Marker = ({ lat, lng, children, className, idx }: MarkerProps) => (
    //     <div className={`marker-container ${className}`} lat={lat} lng={lng}>
    //         <div
    //             onClick={event => onMarkerClick(event, idx)}
    //             ref={el => onRefChange(el, idx)}
    //             className={`marker ${className}`}
    //         >
    //             {children}
    //         </div>
    //     </div>
    // )

    return (
        <div className='index-map full'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={mapOptions()}
                onClick={handleMapClick}
            >
                {/* {markers.map(marker => (
                    <Marker
                        idx={marker.idx}
                        key={marker._id}
                        lat={marker.lat}
                        lng={marker.lng}
                        className={stayToPreview?._id === marker._id ? 'active' : ''}
                    >
                        {marker.price}
                    </Marker>
                ))} */}
                {/* <div
                    onClick={onPreviewClick}
                    lat={stayToPreview?.loc.lat}
                    lng={stayToPreview?.loc.lng}
                    ref={elPreviewContainer}
                    style={previewContainerStyles()}
                    className='map-stay-preview'
                    onMouseEnter={handlePreviewMouseEnter}
                    onMouseLeave={handlePreviewMouseLeave}
                >
                    {stayToPreview && (
                        <StayPreview onAddToWishlist={onAddToWishlist} stay={stayToPreview} isMapView={true} />
                    )}
                </div> */}
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
