import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../components/Common";
import { LNB } from "../../../components/Layout"
import axios from "axios";

const columns = [
    // { Header: "", accessor: "profileImage" },
    { Header: "닉네임", accessor: "nickname" },
    { Header: "코멘트", accessor: "comment" },
    { Header: "좋아요", accessor: "like" },
    { Header: "가입일자", accessor: "createdAt" },
  ];

  const data = [
    
  ];


const BOUser = () => {
    <Table columns={columns} data={data} />
}