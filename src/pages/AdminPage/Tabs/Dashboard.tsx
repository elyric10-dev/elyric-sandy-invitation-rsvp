import React from "react";
import { Card } from "antd";

const Dashboard = ({ data }: any) => {
  return (
    <div className="flex flex-wrap justify-center p-4">
      <div className="w-full text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Seat Plan</h2>
      </div>
      {Object.entries(data).map(([key, value]: any) => (
        <Card key={key} title={key} className="m-2 w-48 shadow-md">
          <p className="font-semibold text-3xl">{value}</p>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
