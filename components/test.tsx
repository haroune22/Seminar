import { getUsers } from "@/actions/user";
import React from "react";

const test = async () => {
  const users = await getUsers();
  console.log(users);
  return <div>test</div>;
};

export default test;
