import React, { useContext, useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import { message, Table, Input, Button, Space, Form, Select } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";

import { SearchOutlined } from "@ant-design/icons";

//TODO получение постов

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const { Option } = Select;

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();

      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
      >
        <Select ref={inputRef} onPressEnter={save} onBlur={save}>
          <Option value="8374">8374</Option>
          <Option value="8370">8370</Option>
          <Option value="8182">8182</Option>
        </Select>
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          padding: 9,
          margin: 0,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class TableStudents extends React.Component {
  constructor(props) {

    const data = JSON.parse(localStorage.getItem("userData"));

    async function fetchGroups() {
      await axios
        .get(
          "http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/task/allGroupsCourses",
          { headers: { Authorization: data.token } }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          message.error(error.message);
        });
    }

    fetchGroups();
    super(props);
    this.columns = [
      {
        title: "Группа",
        dataIndex: "groupName",
        key: "groupName",
        width: "13%",
        editable: true,
      },
      {
        title: "Фамилия",
        dataIndex: "lastName",
        key: "lastName",
        width: "15%",
        ...this.getColumnSearchProps("lastName"),
        sorter: (a, b) => a.lastName.length - b.lastName.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Имя",
        dataIndex: "firstName",
        key: "firstName",
        width: "15%",
        ...this.getColumnSearchProps("firstName"),
      },
      {
        title: "Отчество",
        dataIndex: "middleName",
        key: "middleName",
        width: "15%",
        ...this.getColumnSearchProps("middleName"),
      },
      {
        title: "Логин",
        dataIndex: "login",
        key: "login",
        ...this.getColumnSearchProps("login"),
      },
      {
        title: "E-mail",
        dataIndex: "email",
        key: "email",
        ...this.getColumnSearchProps("email"),
      },
    ];
    this.state = {
      dataSource: [...this.props.posts],
    };
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
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
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
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
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
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

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    console.log("DATA =", dataSource);

    return (
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        columns={columns}
        dataSource={dataSource}
      />
    );
  }
}

export default TableStudents;
