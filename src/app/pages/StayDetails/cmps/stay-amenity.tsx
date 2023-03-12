import Airconditioning from '../../../../assets/images/amenities/air-conditioning.svg'
import Balcony from '../../../../assets/images/amenities/balcony.svg'
import Beachfront from '../../../../assets/images/amenities/beachfront.svg'
import Bedlinens from '../../../../assets/images/amenities/bed-linens.svg'
import Blender from '../../../../assets/images/amenities/blender.svg'
import BoardGames from '../../../../assets/images/amenities/board-games.svg'
import Bodysoap from '../../../../assets/images/amenities/body-soap.svg'
import Buildingstaff from '../../../../assets/images/amenities/building-staff.svg'
import Carbonmonoxidedetector from '../../../../assets/images/amenities/carbon-monoxide-detector.svg'
import Cityskylineview from '../../../../assets/images/amenities/city-skyline-view.svg'
import Cleaningproducts from '../../../../assets/images/amenities/cleaning- products.svg'
import Coffeemaker from '../../../../assets/images/amenities/coffee-maker.svg'
import Cookingbasics from '../../../../assets/images/amenities/cooking-basics.svg'
import Crib from '../../../../assets/images/amenities/Crib.svg'
import Diningtable from '../../../../assets/images/amenities/dining-table.svg'
import Dishesandsilverware from '../../../../assets/images/amenities/dishes-and-silverware.svg'
import Dishwasher from '../../../../assets/images/amenities/dishwasher.svg'
import Doorman from '../../../../assets/images/amenities/doorman.svg'
import Dryer from '../../../../assets/images/amenities/dryer.svg'
import Elevator from '../../../../assets/images/amenities/elevator.svg'
import Essentials from '../../../../assets/images/amenities/essentials.svg'
import Ethernetconnection from '../../../../assets/images/amenities/ethernet-connection.svg'
import Extrapillowsandblankets from '../../../../assets/images/amenities/extra-pillows-and-blankets.svg'
import Fireextinguisher from '../../../../assets/images/amenities/fire-extinguisher.svg'
import Firepit from '../../../../assets/images/amenities/fire-pit.svg'
import Firstaidkit from '../../../../assets/images/amenities/first-aid-kit.svg'
import Freeparkingonpremises from '../../../../assets/images/amenities/free-parking-on-premises.svg'
import Freestreetparking from '../../../../assets/images/amenities/free-street-parking.svg'
import Gym from '../../../../assets/images/amenities/gym.svg'
import Hairdryer from '../../../../assets/images/amenities/hair-dryer.svg'
import Hangers from '../../../../assets/images/amenities/hangers.svg'
import Heating from '../../../../assets/images/amenities/heating.svg'
import HighChair from '../../../../assets/images/amenities/high-chair.svg'
import Hostgreetsyou from '../../../../assets/images/amenities/host-greets-you.svg'
import Hottub from '../../../../assets/images/amenities/hot-tub.svg'
import Hotwater from '../../../../assets/images/amenities/hot-water-kettle.svg'
import Hotwaterkettle from '../../../../assets/images/amenities/hot-water.svg'
import Iron from '../../../../assets/images/amenities/iron.svg'
import Kitchen from '../../../../assets/images/amenities/kitchen.svg'
import Laptopfriendlyworkspace from '../../../../assets/images/amenities/laptop-friendly-workspace.svg'
import Lockbox from '../../../../assets/images/amenities/lockbox.svg'
import Longtermstaysallowed from '../../../../assets/images/amenities/long-term-stays-allowed.svg'
import Microwave from '../../../../assets/images/amenities/Microwave.svg'
import Mountainview from '../../../../assets/images/amenities/mountain-view.svg'
import Oven from '../../../../assets/images/amenities/oven.svg'
import Paidparkingoffpremises from '../../../../assets/images/amenities/paid-parking-off-premises.svg'
import Paidparkingonpremises from '../../../../assets/images/amenities/paid-parking-on-premises.svg'
import Parkview from '../../../../assets/images/amenities/park-view.svg'
import Parking from '../../../../assets/images/amenities/parking.svg'
import Patioorbalcony from '../../../../assets/images/amenities/patio-or-balcony.svg'
import Petsallowed from '../../../../assets/images/amenities/pets-allowed.svg'
import Pool from '../../../../assets/images/amenities/pool.svg'
import Privateentrance from '../../../../assets/images/amenities/private-entrance.svg'
import Refrigerator from '../../../../assets/images/amenities/refrigerator.svg'
import Roomdarkeningshades from '../../../../assets/images/amenities/room-darkening-shades.svg'
import Safe from '../../../../assets/images/amenities/Safe.svg'
import Securitycameras from '../../../../assets/images/amenities/security-cameras.svg'
import Selfcheckin from '../../../../assets/images/amenities/self-check-in.svg'
import Shampoo from '../../../../assets/images/amenities/shampoo.svg'
import Singlelevelhome from '../../../../assets/images/amenities/Single level home.svg'
import Smokedetector from '../../../../assets/images/amenities/smoke-detector.svg'
import Smokingallowed from '../../../../assets/images/amenities/smoking-allowed.svg'
import Stepfreeaccess from '../../../../assets/images/amenities/step-free-access.svg'
import Stove from '../../../../assets/images/amenities/stove.svg'
import Suitableforevents from '../../../../assets/images/amenities/suitable-for-events.svg'
import Toaster from '../../../../assets/images/amenities/toaster.svg'
import TV from '../../../../assets/images/amenities/tv.svg'
import Valleyview from '../../../../assets/images/amenities/valley-view.svg'
import Wardrobe from '../../../../assets/images/amenities/wardrobe.svg'
import Washer from '../../../../assets/images/amenities/washer.svg'
import Waterfront from '../../../../assets/images/amenities/waterfront.svg'
import Wifi from '../../../../assets/images/amenities/wifi.svg'

export function StayAmenity({ amenity }: { amenity: string }) {
    const amenityMap: { [k: string]: string } = {
        'Air conditioning': Airconditioning,
        'Balcony': Balcony,
        'Beachfront': Beachfront,
        'Bed linens': Bedlinens,
        'Blender': Blender,
        'Board Games': BoardGames,
        'Body soap': Bodysoap,
        'Building staff': Buildingstaff,
        'Carbon monoxide detector': Carbonmonoxidedetector,
        'City skyline view': Cityskylineview,
        'Cleaning products': Cleaningproducts,
        'Coffee maker': Coffeemaker,
        'Cooking basics': Cookingbasics,
        'Crib': Crib,
        'Dining table': Diningtable,
        'Dishes and silverware': Dishesandsilverware,
        'Dishwasher': Dishwasher,
        'Doorman': Doorman,
        'Dryer': Dryer,
        'Elevator': Elevator,
        'Essentials': Essentials,
        'Ethernet connection': Ethernetconnection,
        'Extra pillows and blankets': Extrapillowsandblankets,
        'Fire extinguisher': Fireextinguisher,
        'Fire pit': Firepit,
        'First aid kit': Firstaidkit,
        'Free parking on premises': Freeparkingonpremises,
        'Free street parking': Freestreetparking,
        'Gym': Gym,
        'Hair dryer': Hairdryer,
        'Hangers': Hangers,
        'Heating': Heating,
        'High Chair': HighChair,
        'Host greets you': Hostgreetsyou,
        'Hot tub': Hottub,
        'Hot water': Hotwater,
        'Hot water kettle': Hotwaterkettle,
        'Iron': Iron,
        'Kitchen': Kitchen,
        'Laptop friendly workspace': Laptopfriendlyworkspace,
        'Lockbox': Lockbox,
        'Long term stays allowed': Longtermstaysallowed,
        'Microwave': Microwave,
        'Mountain view': Mountainview,
        'Oven': Oven,
        'Paid parking off premises': Paidparkingoffpremises,
        'Paid parking on premises': Paidparkingonpremises,
        'Park view': Parkview,
        'Parking': Parking,
        'Patio or balcony': Patioorbalcony,
        'Pets allowed': Petsallowed,
        'Pool': Pool,
        'Private entrance': Privateentrance,
        'Refrigerator': Refrigerator,
        'Room-darkening shades': Roomdarkeningshades,
        'Safe': Safe,
        'Security cameras': Securitycameras,
        'Self check-in': Selfcheckin,
        'Shampoo': Shampoo,
        'Single level home': Singlelevelhome,
        'Smoke detector': Smokedetector,
        'Smoking allowed': Smokingallowed,
        'Step-free access': Stepfreeaccess,
        'Stove': Stove,
        'Suitable for events': Suitableforevents,
        'Toaster': Toaster,
        'TV': TV,
        'Valley view': Valleyview,
        'Wardrobe': Wardrobe,
        'Washer': Washer,
        'Waterfront': Waterfront,
        'Wifi': Wifi,
    }
    let imgSrc = amenityMap[amenity]

    // If there is no match, choose a random amenity image
    if (!imgSrc) {
        const keys = Object.keys(amenityMap)
        const randomKey = keys[Math.floor(Math.random() * keys.length)]
        imgSrc = amenityMap[randomKey]
    }
    return <img src={imgSrc} className='amenity-img' alt={amenity} />
}
