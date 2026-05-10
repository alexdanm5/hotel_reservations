import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div style={{padding: "40px 19px 24px 18px"}}>
            <h2 style={{'display': 'block', 
                        'fontSize': '32px', 
                        'color': '#ffb489', 
                        'textAlign': 'center', 
                        'marginTop': '20px'}}>
                404
            </h2>
            <h2 style={{'display': 'block', 
                        'fontSize': '32px', 
                        'color': '#ffb489', 
                        'textAlign': 'center', 
                        'marginTop': '20px'}}>
                Page not found
            </h2>
            <div style={{'margin': '20px auto 0 auto'}}>
                <Link to='/'>To Home Page</Link>
            </div>
        </div>
    )
}

export default Page404;