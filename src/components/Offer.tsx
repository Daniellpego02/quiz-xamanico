import { QuizPath } from '../types';

interface OfferProps {
    quizPath: QuizPath;
    userName: string;
}

const Offer = ({ quizPath, userName }: OfferProps) => {
    const priceOld = "97,00";
    const priceNew = "27,90";

    return (
        <div>
            <p>Quiz Path: {quizPath}</p>
            <p>User Name: {userName}</p>
            <p>Previous Price: {priceOld}</p>
            <p>New Price: {priceNew}</p>
        </div>
    );
};

export default Offer;