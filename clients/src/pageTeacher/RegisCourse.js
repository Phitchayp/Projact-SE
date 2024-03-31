import React, { useState, useEffect } from 'react';
import RegisResultTable from '../components/RegisResultTable';
import CloseRegis from './CloseRegis';

function RegisCourse() {
  const [apiResult, setApiResult] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/gettimeteachercheck');
      const data = await response.text();
      setApiResult(data);
      console.log(apiResult);
    } catch (error) {
      console.error('Error fetching API:', error);
      setApiResult('error');
    }
  };

  useEffect(() => {
    // เรียก fetchData เมื่อ component โหลดเสร็จ
    fetchData();

    // เรียก fetchData ทุกๆ 1 นาที
    const interval = setInterval(fetchData, 30000);

    // ให้ clearInterval เมื่อ component unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      {apiResult === "pass" ? (
        
        <RegisResultTable />
      ) : (
        <CloseRegis />
      )}
    </div>
  );
}

export default RegisCourse;
