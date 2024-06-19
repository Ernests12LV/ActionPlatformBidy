import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Box, Avatar, Typography, Button, List, ListItem, ListItemText, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DashBoardController from './DashBoardController';
import IAuction from '../../interfaces/IAuctionData';

const DashBoard: React.FC = () => {
    const { t } = useTranslation(); // Initialize useTranslation hook

    const [auctions, setAuctions] = useState<IAuction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);

    // Fetch and other functions from controller
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

    // UseEffect to load auctions
    useEffect(() => {
        const loadAuctions = async () => {
            try {
                const data = await fetchAuctions();
                setAuctions(data);
            } catch (err: any) {
                setError(t('dashboard.failedToFetchAuctions')); // Translate error message
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadAuctions();
    }, [fetchAuctions, t]);

    // Handlers for opening and closing dialog
    const handleClickOpen = () => {
        // Clear form fields and set default values
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

    // Handler for form submission
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
            setError(t('dashboard.failedToFetchAuctions')); // Translate error message
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handlers for editing and deleting auctions
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
            setError(t('dashboard.failedToDeleteAuction')); // Translate error message
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
                <Typography variant="h5">{t('dashboard.title')}</Typography> {/* Translate 'BiDy' */}
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
                    {t('dashboard.add')} {/* Translate 'Add' */}
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
                                secondary={`${t('dashboard.auctionDescription')}: ${auction.description}, ${t('dashboard.startTime')}: ${auction.startTime}, ${t('dashboard.startingPrice')}: ${auction.startingPrice}, ${t('dashboard.auctionStep')}: ${auction.auctionStep}`}
                            />
                            <Button onClick={() => handleEditClick(auction)}>{t('dashboard.edit')}</Button> {/* Translate 'Edit' */}
                            <Button onClick={() => handleDeleteClick(auction._id)}>{t('dashboard.delete')}</Button> {/* Translate 'Delete' */}
                        </ListItem>
                    ))}
                </List>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isEditing ? t('dashboard.editAuction') : t('dashboard.addAuction')}</DialogTitle> {/* Translate dialog title */}
                <form onSubmit={handleFormSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label={t('dashboard.auctionTitle')} /* Translate 'Title' */
                            type="text"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label={t('dashboard.auctionDescription')} /* Translate 'Description' */
                            type="text"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="startTime"
                            label={t('dashboard.startTime')} /* Translate 'Start Time' */
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
                            label={t('dashboard.startingPrice')} /* Translate 'Starting Price' */
                            type="number"
                            fullWidth
                            value={startingPrice}
                            onChange={(e) => setStartingPrice(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="auctionStep"
                            label={t('dashboard.auctionStep')} /* Translate 'Auction Step' */
                            type="number"
                            fullWidth
                            value={auctionStep}
                            onChange={(e) => setAuctionStep(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            {t('dashboard.cancel')} {/* Translate 'Cancel' */}
                        </Button>
                        <Button type="submit" color="primary">
                            {isEditing ? t('dashboard.submit') : t('dashboard.add')} {/* Translate 'Submit' or 'Add' */}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
};

export default DashBoard;
