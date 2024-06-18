// DashboardController.ts
import { useState } from 'react';
import DashboardService from '../../services/DashboardService';
import { DashboardModel } from '../../models/DashboardModel';

const DashboardController = () => {
    const [dashboardData, setDashboardData] = useState<DashboardModel | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const data = await DashboardService.fetchDashboardData();
            setDashboardData(data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        dashboardData,
        isLoading,
        fetchData,
    };
};

export default DashboardController;
