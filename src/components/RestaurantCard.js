import { CDN_URL} from "../utils/constants";

//Restaurant card component
const RestaurantCard = (props) => {
    const {resData} = props;
    console.log(props);
    const {
      cloudinaryImageId, 
      name,
      cuisines,
      costForTwo,
      avgRating,
    } = resData?.info //resData?.card.card.info;
    return (
        <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-300" >
            <img className="rounded-lg" alt = "res-logo" src = { CDN_URL + cloudinaryImageId}/>
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{costForTwo}</h4>
            <h4>{avgRating}<i className="fa-solid fa-star"></i></h4>
            <h4>{resData.info.sla.deliveryTime} minutes</h4>
            
        </div>
    )
};

//enhancing normal restaurant card component
// export const withPromotedLabel = (RestaurantCard) => {
//     return (props)=> {
//         return(
//             <div>
//                 <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
//                 <RestaurantCard resData{...props} />
//             </div>
//         )
//     }
// };

export default RestaurantCard;