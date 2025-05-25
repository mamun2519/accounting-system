import React from "react";
import TablePage from "../component/Table";

const page = async () => {
  const response = await fetch("http://localhost:3000/api/account");
  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }
  const accounts = await response.json();
  console.log(accounts);
  return (
    <div>
      <TablePage accounts={accounts} />
    </div>
  );
};

export default page;
