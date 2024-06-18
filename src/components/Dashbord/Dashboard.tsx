// Dashboard.tsx
import React from 'react';
import { Grid, Typography } from '@mui/material';
import DashboardController from './DashboardController';

const Dashboard: React.FC = () => {
    const { dashboardData, isLoading, fetchData } = DashboardController();

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Grid item xs={12}>
                    {/* Render dashboard data */}
                </Grid>
            )}
        </Grid>
    );
};

export default Dashboard;
