import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Box, Avatar, Typography, List, ListItem, ListItemText, CircularProgress, IconButton } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import IAuction from '../../interfaces/IAuctionData';
import HomeController from './HomeController';
import { ArrowBack } from '@mui/icons-material';

const HomeView: React.FC = () => {
    const { t } = useTranslation(); // Initialize useTranslation hook

    const [auctions, setAuctions] = useState<IAuction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const {
        fetchAuctions,
    } = HomeController();

    useEffect(() => {
        const loadAuctions = async () => {
            try {
                const data = await fetchAuctions();
                setAuctions(data);
            } catch (err: any) {
                setError(t('home.failedToFetchAuctions')); // Translate error message
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadAuctions();
    }, [fetchAuctions, t]);

    return (
        <>
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
                    <Typography variant="h5">{t('home.title')}</Typography> {/* Translate 'BiDy' */}
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    mb: 3,
                }}>
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
                                    secondary={`${t('home.description')}: ${auction.description}, ${t('home.startTime')}: ${auction.startTime}, ${t('home.startingPrice')}: ${auction.startingPrice}, ${t('home.auctionStep')}: ${auction.auctionStep}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Container>
        </>
    );
};

export default HomeView;
