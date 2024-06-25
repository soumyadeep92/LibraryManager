import { useRoutes } from "react-router-dom";
import {QuizSequence} from "../components/Quiz/QuizSequence";
import Quiz from "../components/Quiz/Quiz";
import App from '../App';

const QuizRoutes = () => {
    let routes = useRoutes([
        { path: "/", element: <App /> },
        { path: "quiz", element: <Quiz /> },
        { path: "quiz-sequence", element: <QuizSequence /> }
    ]);
    return routes;
}
export default QuizRoutes;