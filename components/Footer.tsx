import React from "react";
import { footerList1, footerList2, footerList3 } from "../utils/constants";
const Footer1 = () => {
  const List = ({items, mt}: {items: string[], mt:boolean}) => (
    <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
      {items.map((item) => (
        <p
          key={item}
          className="tex-gray-400 text-sm hover:underline cursor-pointer"
        >
          {item}
        </p>
      ))}
    </div>
  );
  return <div className="mt-6 hidcen xl:block">
    <List items={footerList1} mt={false}/>
    <List items={footerList2} mt/>
    <List items={footerList3} mt/>
    <p className="text-sm mt-5 text-gray-400 hidden xl:block">2022 Tiktik</p>
  </div>;
};

export default Footer1;
