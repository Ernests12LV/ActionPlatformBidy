import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Box, Avatar, Typography, Button, List, ListItem, ListItemText, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashBoardController from './DashBoardController';
import IAuction from '../../interfaces/IAuctionData';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const DashBoard: React.FC = () => {
    const [auctions, setAuctions] = useState<IAuction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);

    const {
        fetchAuctions,
        handleSubmit,
        handleUpdate,
        handleDelete,
        title, setTitle,
        description, setDescription,
        startTime, setStartTime,
        startingPrice, setStartingPrice,
        auctionStep, setAuctionStep
    } = DashBoardController();

    useEffect(() => {
        const loadAuctions = async () => {
            try {
                const data = await fetchAuctions();
                setAuctions(data);
            } catch (err: any) {
                setError('Failed to fetch auctions');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadAuctions();
    }, [fetchAuctions]);

    const handleClickOpen = () => {
        setTitle("");
        setDescription("");
        setStartTime("");
        setStartingPrice("");
        setAuctionStep("");
        setCurrentId(null);
        setIsEditing(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpen(false);
        setLoading(true);

        try {
            if (isEditing && currentId) {
                await handleUpdate(currentId);
            } else {
                await handleSubmit(e);
            }

            const updatedAuctions = await fetchAuctions();
            setAuctions(updatedAuctions);
        } catch (err: any) {
            setError('Failed to fetch auctions');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (auction: IAuction) => {
        setCurrentId(auction._id);
        setTitle(auction.title);
        setDescription(auction.description);
        setStartTime(auction.startTime);
        setStartingPrice(auction.startingPrice);
        setAuctionStep(auction.auctionStep);
        setIsEditing(true);
        setOpen(true);
    };

    const handleDeleteClick = async (auctionId: string) => {
        setLoading(true);
        try {
            await handleDelete(auctionId);
            const updatedAuctions = await fetchAuctions();
            setAuctions(updatedAuctions);
        } catch (err: any) {
            setError('Failed to delete auction');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <CssBaseline />
            <Box sx={{ position: 'relative', mt: 2 }}>
                <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} component={Link} to="/">
                    <ArrowBack />
                </IconButton>
            </Box>
            <Box
                sx={{
                    mt: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                    <DashboardIcon />
                </Avatar>
                <Typography variant="h5">BiDy</Typography>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mb: 3,
            }}>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mr: 2 }}
                    onClick={handleClickOpen}
                >
                    Add
                </Button>
            </Box>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <List>
                    {auctions.map((auction) => (
                        <ListItem key={auction._id}>
                            <ListItemText
                                primary={`${auction.title}: ${auction._id}`}
                                secondary={`Description: ${auction.description}, Start Time: ${auction.startTime}, Starting Price: ${auction.startingPrice}, Auction Step: ${auction.auctionStep}`}
                            />
                            <Button onClick={() => handleEditClick(auction)}>Edit</Button>
                            <Button onClick={() => handleDeleteClick(auction._id)}>Delete</Button>
                        </ListItem>
                    ))}
                </List>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEditing ? 'Edit Auction' : 'Add New Auction'}</DialogTitle>
                <form onSubmit={handleFormSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="startTime"
                            label="Start Time"
                            type="datetime-local"
                            fullWidth
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="startingPrice"
                            label="Starting Price"
                            type="number"
                            fullWidth
                            value={startingPrice}
                            onChange={(e) => setStartingPrice(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="auctionStep"
                            label="Auction Step"
                            type="number"
                            fullWidth
                            value={auctionStep}
                            onChange={(e) => setAuctionStep(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            {isEditing ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
};

export default DashBoard;
