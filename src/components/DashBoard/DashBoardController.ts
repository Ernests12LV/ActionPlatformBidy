import { useState } from "react";
import axios from '../../axiosInstance';
import IAuctionData from "../../interfaces/IAuctionData";

const DashBoardController = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [startingPrice, setStartingPrice] = useState("");
    const [auctionStep, setAuctionStep] = useState("");
    const [_id, setId] = useState('');

    const fetchAuctions = async () => {
        try {
            const response = await axios.get('/list-auctions'); // Adjust the endpoint based on your backend
            return response.data;
        } catch (err: any) {
            console.error('Failed to fetch auctions:', err);
            throw err;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const auctionData: IAuctionData = {
                title,
                description,
                startTime,
                startingPrice,
                auctionStep,
                _id: ""
            };

            const res = await axios.post("/register-auction", auctionData);
            console.log(res.data);

            // Clear form fields after successful submission
            setTitle("");
            setDescription("");
            setStartTime("");
            setStartingPrice("");
            setAuctionStep("");

        } catch (err: any) {
            console.error(err.response ? err.response.data : "Error occurred:", err.message);
        }
    };

    const handleUpdate = async (auctionId: string) => {
        try {
            const auctionData = {
                title,
                description,
                startTime,
                startingPrice,
                auctionStep
            };

            const res = await axios.put(`/update-auction/${auctionId}`, auctionData);
            console.log(res.data);

            // Clear form fields after successful update
            setTitle("");
            setDescription("");
            setStartTime("");
            setStartingPrice("");
            setAuctionStep("");

        } catch (err: any) {
            console.error(err.response ? err.response.data : "Error occurred:", err.message);
            throw err;
        }
    };

    const handleDelete = async (auctionId: string) => {
        try {
            const res = await axios.delete(`/delete-auction/${auctionId}`);
            console.log(res.data);
        } catch (err: any) {
            console.error('Failed to delete auction:', err);
            throw err;
        }
    };

    return {
        fetchAuctions,
        handleSubmit,
        handleUpdate,
        handleDelete,
        _id, setId,
        title, setTitle,
        description, setDescription,
        startTime, setStartTime,
        startingPrice, setStartingPrice,
        auctionStep, setAuctionStep
    };
};

export default DashBoardController;
