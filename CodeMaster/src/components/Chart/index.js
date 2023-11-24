import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  width: 850,
  height: 215,
};
const dataset = [
  {
    seoul: 483,
    depart: 'Limpeza',
  },
  {
    seoul: 841,
    depart: 'Alimentos',
  },
  {
    seoul: 1057,
    depart: 'Materiais',
  },
];

export default function Charts() {
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'depart' }]}
      series={[{ dataKey: 'seoul', label: 'Quantidade Total', color: '#02ABC2'}]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}