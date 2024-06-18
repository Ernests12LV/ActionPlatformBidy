// DashboardService.ts
import axios from 'axios';

const DashboardService = {
    async fetchDashboardData() {
        const response = await axios.get('/api/dashboard');
        return response.data;
    },
};

export default DashboardService;
