import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    groupId: `83${i}`,
    FIO: `Иванов Иван Иванович ${i}`,
    login: `Ivan${i}`,
    email: `${i}@ya.ru`,
  });
}

class TableStudents extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Поиск
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Сброс
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: 'Группа',
        dataIndex: 'groupId',
        key: 'groupId',
        width: '10%',
        ...this.getColumnSearchProps('groupId'),

      },
      {
        title: 'Фамилия',
        dataIndex: 'lastName',
        key: 'lastName',
        width: '15%',
        ...this.getColumnSearchProps('lastName'),
        sorter: (a, b) => a.lastName.length - b.lastName.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Имя',
        dataIndex: 'firstName',
        key: 'firstName',
        width: '15%',
        ...this.getColumnSearchProps('firstName'),
      },
      {
        title: 'Отчество',
        dataIndex: 'middleName',
        key: 'middleName',
        width: '15%',
        ...this.getColumnSearchProps('middleName'),
      },
      {
        title: 'Логин',
        dataIndex: 'login',
        key: 'login',
        ...this.getColumnSearchProps('login'),
      },
      {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        ...this.getColumnSearchProps('email'),
      },
    
    ];


    console.log("Props =", this.props.posts)

    return <Table columns={columns} dataSource={this.props.posts} />;
  }
}

export default TableStudents;