import HeaderBack from "../header_back/HeaderBack"
import RoomCard from "../room_card/RoomCard";

const RoomsList = () => {

    return (
        <div style={{padding: "40px 19px 24px 18px", background: "#f5f5f5"}}>
            <HeaderBack header={'Beach Resort Lux'} path={'/hotel'}/>

            <div style={{marginTop: "26px", display: "flex", flexDirection: "column", gap: "19px"}}>
                <RoomCard />
                <RoomCard />
                <RoomCard />
            </div>
        </div>
    )
}

export default RoomsList;