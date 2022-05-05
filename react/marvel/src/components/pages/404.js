import { Helmet } from 'react-helmet';
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="Страница ошибки"
                />
                <title>404</title>
            </Helmet>

            <ErrorMessage/>
            <p style={{"display": "block", "textAlign": "center"}}>Ошибка</p>
            <Link style={{"display": "block", "textAlign": "center"}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;