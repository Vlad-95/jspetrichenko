import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p>Error</p>
            <Link to="/">Back to mainpage</Link>
        </div>
    )
}

export default Page404;