import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{"display": "block", "textAlign": "center"}}>Ошибка</p>
            <Link style={{"display": "block", "textAlign": "center"}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;