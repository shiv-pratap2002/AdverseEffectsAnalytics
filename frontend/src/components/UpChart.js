
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Box, Typography, Stack } from '@mui/material';
import InitialState from "./InitialState";
import Loading from './Loading';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function PieAlertsSource({ loading, effectsData, numArticles, key, keyword }) {
    const aeQty = effectsData ? effectsData.identified_articles : 0;
    const nonAeQty = numArticles - aeQty;
    const data = [
        { name: 'Non-Adverse Cases', qty: nonAeQty },
        { name: 'Adverse Cases', qty: aeQty },
    ];

    return (
        <div key={key}>
            {effectsData ?
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        flexWrap: 'wrap',
                    }}
                >
                    <PieChart width={200} height={338}>
                        <Pie
                            data={data}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="qty"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <Stack gap={2} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: '10px' }}>Adverse Effects Distribution</Typography>
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            {COLORS.map((color, i) => (
                                <Stack key={color} alignItems='center' spacing={1}>
                                    {data[i]?.name ? <Box sx={{ width: 20, height: 20, background: color }} /> : null}
                                    <Typography variant='body2' sx={{ opacity: 0.7 }}>{data[i]?.name}</Typography>
                                </Stack>
                            ))}
                        </Box>
                        <Typography variant="h6">&#128073; {aeQty} out of {numArticles} articles report adverse side effects for {keyword}</Typography>
                    </Stack>
                </Box>
                : loading ? <Loading /> : <div><InitialState /></div>}
        </div>
    );
}