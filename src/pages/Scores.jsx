import axios from "axios";
import React, {useState, useEffect} from "react";
import "antd/dist/antd.css";
import { Table, Badge, Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import TableStudentScores from "../components/TableStudentScores";

const Scores = () => {

    const expandedRowRender = () => {
      const columns = [
        {
          title: 'Студент',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Группа',
          dataIndex: 'group',
          key: 'group',
        },
        {
          title: 'Дата',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Оценка',
          dataIndex: 'upgradeNum',
          key: 'upgradeNum',
        },
      ];
      const data = [];
  
      for (let i = 1; i < 4; ++i) {
        data.push({
          key: i,
          group: 8374,
          date: '2022-12-24 23:12:00',
          name: `Иванов ${i}`,
          upgradeNum: '5',
        });
      }
  
      return <Table columns={columns} dataSource={data} pagination={false} />;
    };
  
    const columns = [
      {
        title: 'Задание',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Курс',
        dataIndex: 'platform',
        key: 'platform',
      },
    ];
    const data = [];
  
    for (let i = 1; i < 7; ++i) {
      data.push({
        key: i,
        name: `Задание ${i}`,
        platform: 'Course 1',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
      });
    }
  
  

  return (
    <div>
      <h1></h1>
      <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{
        expandedRowRender,
      }}
      dataSource={data}
    />
    </div>
  );
};

export default Scores;
