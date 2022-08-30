import './App.scss';
import 'antd/dist/antd.css'; 
import { Layout, Card, Button, DatePicker, Drawer, Form, Input, Select, Space, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ReactElement, useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { MdModeEdit, MdDelete, MdCheckCircle, MdCancel, MdOutlineAddCircle } from 'react-icons/md';
import { useGlobalState } from './providers/hookstateProvider';
import { v4 as uuidv4 } from 'uuid';
const SteinStore = require("stein-js-client");
const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
);

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

function App() {
  const state = useGlobalState();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [cities, setCities] = useState([]);
  const [newData, setNewdata] = useState({
      uuid: "",
      komoditas: "",
      area_provinsi: "",
      area_kota: "",
      size: "",
      price: "",
      tgl_parsed: "",
      timestamp: ""
  });
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const asd = uuidv4();
    fetchPriceList();
    fetchAreaOptions();
    fetchSizeOptions();
  }, [])

  useEffect(() => {
    let areaTemp = Object.assign([], state.areaOptions())
    const citiesTemp = areaTemp.filter(city => city.province === selectedItem.area_provinsi)
    setCities(citiesTemp);
  }, [selectedItem])

  useEffect(() => {
    let areaTemp = Object.assign([], state.areaOptions())
    const citiesTemp = areaTemp.filter(city => city.province === newData.area_provinsi)
    setCities(citiesTemp);
  }, [newData])

  const fetchPriceList = async () => {
    try {
      state.fetchPriceList();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAreaOptions = async () => {
    try {
      state.fetchAreaOptions();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSizeOptions = async () => {
    try {
      state.fetchSizeOptions();
    } catch (error) {
      console.error(error);
    }
  };

  const edit = async (data) => {
    setIsEdit(!isEdit)
    setSelectedItem(data)
  }

  const deleteItem = async (uuid) => {
    state.deleteItem(uuid);
  }

  const handleChangeInput = async (event, key) => {
    let tempItem = Object.assign({}, selectedItem);
    tempItem[key] = event.target.value
    setSelectedItem(tempItem)
  }

  const handleChangeSelect = async (event, key) => {
    let tempItem = Object.assign({}, selectedItem);
    tempItem[key] = event
    setSelectedItem(tempItem)
  }

  const handleChangeInputNew = async (event, key) => {
    let tempItem = Object.assign({}, newData);
    tempItem[key] = event.target.value
    setNewdata(tempItem)
  }

  const handleChangeSelectNew = async (event, key) => {
    console.log("event", event)
    console.log("key", key)
    let tempItem = Object.assign({}, newData);
    tempItem[key] = event
    setNewdata(tempItem)
  }

  const save = async (uuid) => {
    state.updateItemList(uuid, selectedItem)
    setIsEdit(false);
  }

  const addData = () => {
    setVisible(true);
  }

  const saveNewData = () => {
    setVisible(false);
    let newDataTemp = Object.assign({}, newData);

    newDataTemp.uuid = uuidv4();
    newDataTemp.tgl_parsed = moment(newDataTemp.tgl_parsed).format("YYYY-MM-DDTHH:mm:SSZ");
    newDataTemp.timestamp = Math.floor(new Date(newDataTemp.tgl_parsed).getTime() / 1000);

    state.saveNewData(newDataTemp);
  }

  const columns = [
    {
        name: 'Komoditas',
        selector: row => row.komoditas,
        sortable: true,
        cell: row => (
          <div>
            {isEdit ?
              row.uuid === selectedItem.uuid ? 
              <div key={row.uuid}>
                <input type="text" id="commodity" name="commodity" value={selectedItem.komoditas} onChange={(event) => handleChangeInput(event, 'komoditas')} />
              </div>
              :
              <div key={row.uuid}>{row.komoditas}</div>
            : 
              <div key={row.uuid}>{row.komoditas}</div>
            }
          </div> 
        )
    },
    {
      name: 'Area Provinsi',
      selector: row => row.area_provinsi,
      sortable: true,
      cell: row => (
        <div>
         {isEdit ?
           row.uuid === selectedItem.uuid ? 
           <div key={row.uuid}>
            <select value={selectedItem.area_provinsi} onChange={(event) => handleChangeInput(event, 'area_provinsi')}>
              {
                state.provinces().map((data, index) => {
                  return(
                    <option value={data.province}>
                      {data.province}
                    </option>
                  )
                })
              }
            </select>
           </div>
           :
           <div key={row.uuid}>{row.area_provinsi}</div>
         : 
           <div key={row.uuid}>{row.area_provinsi}</div>
         }
        </div> 
      )
    },
    {
      name: 'Area Kota',
      selector: row => row.area_kota,
      sortable: true,
      cell: row => (
        <div>
         {isEdit ?
           row.uuid === selectedItem.uuid ? 
           <div key={row.uuid}>
             <select value={selectedItem.area_kota} onChange={(event) => handleChangeInput(event, 'area_kota')}>
              {
                cities.map((data, index) => {
                  return(
                    <option value={data.city}>
                      {data.city}
                    </option>
                  )
                })
              }
            </select>
           </div>
           :
           <div key={row.uuid}>{row.area_kota}</div>
         : 
           <div key={row.uuid}>{row.area_kota}</div>
         }
        </div> 
      )
    },
    {
      name: 'Ukuran',
      selector: row => row.size,
      sortable: true,
      cell: row => (
        <div>
         {isEdit ?
           row.uuid === selectedItem.uuid ? 
           <div key={row.uuid}>
            <select value={selectedItem.size} onChange={(event) => handleChangeInput(event, 'size')}>
              {
                state.sizeOptions().map((data, index) => {
                  return(
                    <option value={data.size}>
                      {data.size}
                    </option>
                  )
                })
              }
            </select>
           </div>
           :
           <div key={row.uuid}>{row.size}</div>
         : 
           <div key={row.uuid}>{row.size}</div>
         }
        </div> 
      )
    },
    {
      name: 'Harga',
      selector: row => row.price,
      sortable: true,
      cell: row => (
       <div>
        {isEdit ?
          row.uuid === selectedItem.uuid ? 
          <div key={row.uuid}>
            <input type="text" id="price" name="price" value={selectedItem.price} onChange={(event) => handleChangeInput(event, 'price')} />
          </div>
          :
          <div key={row.uuid}>{row.price}</div>
        : 
          <div key={row.uuid}>{row.price}</div>
        }
       </div> 
      )
    },
    {
        name: 'Tanggal',
        selector: row => row.tgl_parsed,
        sortable: true,
        format: row => `${moment(row.tgl_parsed).format('MMMM Do YYYY, h:mm:ss a')}`,
        cell: row => (
          <div>
           {isEdit ?
             row.uuid === selectedItem.uuid ? 
             <div key={row.uuid}>
               <input type="date" id="date" name="date" value={moment(selectedItem.tgl_parsed).format('YYYY-MM-DD')} onChange={(event) => handleChangeInput(event, 'tgl_parsed')} />
             </div>
             :
             <div key={row.uuid}>{moment(row.tgl_parsed).format('YYYY-MM-DD')}</div>
           : 
             <div key={row.uuid}>{moment(row.tgl_parsed).format('YYYY-MM-DD')}</div>
           }
          </div> 
         )
    },
    {
      name: 'Aksi',
      cell: row => (
        <div>
          {isEdit ?
            row.uuid === selectedItem.uuid ? 
              <div>
                <Button shape="circle" type="text" onClick={() => save(row.uuid)} icon={<CheckCircleOutlined className="icon-green" />}></Button>
                <Button shape="circle" type="text" onClick={() => setIsEdit(false)} icon={<CloseCircleOutlined className="icon-red" />}></Button>
              </div>
              :
              <div>
                <Button shape="circle" type="text" disabled icon={<EditOutlined className="icon-green" />}></Button>
                <Button shape="circle" type="text" disabled icon={<DeleteOutlined className="icon-red" />}></Button>
              </div>
          :
            <div>
              <Button shape="circle" type="text" icon={<EditOutlined className="icon-green" />}></Button>
              <Button shape="circle" type="text" icon={<DeleteOutlined className="icon-red" />}></Button>
            </div>
          }
        </div> 
      )
    },
  ];

  return (
    <div className="App">
      <Layout>
        <Header>Header</Header>
        <Content>
          <Row>
            <Col span={24}>
              <Button type="primary" shape="round" icon={<PlusCircleOutlined />} onClick={() => addData()}>
                Tambah Data
              </Button>
              <Card bordered={false}>
                <DataTable
                  columns={columns}
                  data={state.priceList()}
                  pagination
                />
              </Card>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
      <Drawer
        title="Tambah Data Baru"
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        placement={"top"}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={saveNewData} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="komoditas"
                label="Komoditas"
                rules={[
                  {
                    required: true,
                    message: 'Mohon masukan komoditas',
                  },
                ]}
              >
                <Input placeholder="Masukan Komoditas" onChange={(event) => handleChangeInputNew(event, 'komoditas')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="size"
                label="Ukuran"
                rules={[
                  {
                    required: true,
                    message: 'Silahkan pilih ukuran',
                  },
                ]}
              >
                <Select placeholder="Pilih ukuran" onChange={(event) => handleChangeSelectNew(event, 'size')}>
                  {
                    state.sizeOptions().map((data, index) => {
                      return(
                        <Option key={index} value={data.size}>
                          {data.size}
                        </Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="area_provinsi"
                label="Area Provinsi"
                rules={[
                  {
                    required: true,
                    message: 'Silahkan pilih area provinsi',
                  },
                ]}
              >
                <Select placeholder="Pilih area provinsi" onChange={(event) => handleChangeSelectNew(event, 'area_provinsi')}>
                  {
                    state.provinces().map((data, index) => {
                      return(
                        <Option key={index} value={data.province}>
                          {data.province}
                        </Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="area_kota"
                label="Area Kota"
                rules={[
                  {
                    required: true,
                    message: 'Silahkan pilih area kota',
                  },
                ]}
              >
                <Select placeholder="Pilih area kota" onChange={(event) => handleChangeSelectNew(event, 'area_kota')}>
                  {
                    cities.map((data, index) => {
                      return(
                        <Option key={index} value={data.city}>
                          {data.city}
                        </Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Harga"
                rules={[
                  {
                    required: true,
                    message: 'Mohon masukan harga',
                  },
                ]}
              >
                <Input placeholder="Masukan harga" onChange={(event) => handleChangeInputNew(event, 'price')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tgl_parsed"
                label="Tanggal"
                rules={[
                  {
                    required: true,
                    message: 'Silahkan pilih ukuran',
                  },
                ]}
              >
                <DatePicker
                  style={{
                    width: '100%',
                  }}
                  onChange={(date, dateString) => handleChangeSelectNew(dateString, 'tgl_parsed')}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}

export default App;
