"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext"; 
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


interface YearMonth {
    year_month: string;
}

const SelectYearMonth = () => {
    const { yearMonth , setYearMonth, setPrevYearMonth } = useAppContext();

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedYearMonth = event.target.value;
        setYearMonth({ year_month: selectedYearMonth });

        // 選択された年月の年と月を取得
        const selectedYear = parseInt(selectedYearMonth.slice(0, 4));
        const selectedMonth = parseInt(selectedYearMonth.slice(4, 6));

        // 1ヶ月前の年月を計算
        let prevYear = selectedYear;
        let prevMonth = selectedMonth - 1;
        if (prevMonth < 1) {
            prevMonth = 12;
            prevYear -= 1;
        }

        // 1ヶ月前の年月を文字列に変換して設定
        const prevYearMonthStr = `${prevYear}${prevMonth.toString().padStart(2, '0')}`;
        setPrevYearMonth(prevYearMonthStr);
    };

    return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">表示する年月をえらぶ！</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={yearMonth.year_month}
          label="表示する年月をえらぶ！"
          onChange={handleMonthChange}
          style={{
            fontSize: '18px',
            textAlign: 'center',
            width: '40vh',
            color: 'var(--sub11)',
            backgroundColor: 'var(--sub10)'
          }}
        >
          <MenuItem value="202412">2024年12月</MenuItem>
          <MenuItem value="202411">2024年11月</MenuItem>
          <MenuItem value="202410">2024年10月</MenuItem>
          <MenuItem value="202409">2024年9月</MenuItem>
          <MenuItem value="202408">2024年8月</MenuItem>
          <MenuItem value="202407">2024年7月</MenuItem>
          <MenuItem value="202406">2024年6月</MenuItem>
          <MenuItem value="202405">2024年5月</MenuItem>
          <MenuItem value="202404">2024年4月</MenuItem>
          <MenuItem value="202403">2024年3月</MenuItem>
          <MenuItem value="202402">2024年2月</MenuItem>
          <MenuItem value="202401">2024年1月</MenuItem>
          <MenuItem value="202312">2023年12月</MenuItem>
          <MenuItem value="202311">2023年11月</MenuItem>
          <MenuItem value="202310">2023年10月</MenuItem>
          <MenuItem value="202309">2023年9月</MenuItem>
          <MenuItem value="202308">2023年8月</MenuItem>
          <MenuItem value="202307">2023年7月</MenuItem>
          <MenuItem value="202306">2023年6月</MenuItem>
          <MenuItem value="202305">2023年5月</MenuItem>
          <MenuItem value="202304">2023年4月</MenuItem>
          <MenuItem value="202303">2023年3月</MenuItem>
          <MenuItem value="202302">2023年2月</MenuItem>
          <MenuItem value="202301">2023年1月</MenuItem>
          <MenuItem value="202212">2022年12月</MenuItem>
          <MenuItem value="202211">2022年11月</MenuItem>
          <MenuItem value="202210">2022年10月</MenuItem>
          <MenuItem value="202209">2022年9月</MenuItem>
          <MenuItem value="202208">2022年8月</MenuItem>
          <MenuItem value="202207">2022年7月</MenuItem>
          <MenuItem value="202206">2022年6月</MenuItem>
          <MenuItem value="202205">2022年5月</MenuItem>
          <MenuItem value="202204">2022年4月</MenuItem>
          <MenuItem value="202203">2022年3月</MenuItem>
          <MenuItem value="202202">2022年2月</MenuItem>
          <MenuItem value="202201">2022年1月</MenuItem>
        </Select>
      </FormControl>
    </Box>
    );
};

export default SelectYearMonth

