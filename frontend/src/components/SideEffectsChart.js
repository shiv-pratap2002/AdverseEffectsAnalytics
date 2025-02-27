import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Box, Typography, Stack } from '@mui/material';
import InitialState from "./InitialState";
import Loading from "./Loading";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF3700", "#3e9b49", "#cc6c19",
//   "#f7e84d", "#ae5e4b", "#91b4d9", "#6629b4"];

const COLORS = [
  "#7C4F81", "#B83218", "#E58E8D", "#E67A77", "#5E8C31",
  "#C73D4F", "#4C8B99", "#A24B5C", "#267455", "#F7AB6E",
  "#8F2040", "#6FAE8E", "#A54147", "#4EAA80", "#B55B23",
  "#3E5A55", "#E7B841", "#4A5D9F", "#BC7C3A", "#2D5243",
  "#8C79A3", "#406C82", "#DB8D4F", "#574E7F", "#9A934B",
  "#2E7A8A", "#C4435D", "#9E8E36", "#4A8478", "#D08A89"
]

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
//   index,
//   data
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {/* {`${data[index].qty}`} */}
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

export default function PieAlertsSource({ loading, effectsData, key }) {
  const sideEffects = effectsData?.side_effects || {};
  const data = Object.entries(sideEffects).map(([name, qty], index) => ({
    name,
    qty
  }));

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
          <PieChart width={200} height={240}>
            <Pie
              dataKey="qty"
              isAnimationActive={false}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={70}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            {/* <Pie
              data={data}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="qty"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie> */}
            <Tooltip />
          </PieChart>
          <Stack gap={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px' }}>
            <Typography variant="h5" fontWeight="bold">Side Effects Distribution</Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'space-around' }}>
              {COLORS.map((color, i) => (
                <Stack key={color} alignItems='center' spacing={1}>
                  {data[i]?.name ? <Box sx={{ width: 20, height: 20, background: color }} /> : null}
                  <Typography variant='body2' sx={{ opacity: 0.7 }}>{data[i]?.name}</Typography>
                </Stack>
              ))}
            </Box>
          </Stack>
        </Box>
        : loading ? <Loading /> : <div><InitialState /></div>
      }</div>
  );
}