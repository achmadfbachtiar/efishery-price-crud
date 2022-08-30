import './App.scss';
import 'antd/dist/antd.css'; 
import { Layout, Card, Button, Modal, Select, Row, Col, Input, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, PlusCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ReactElement, useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { useGlobalState } from './providers/hookstateProvider';
import CreateForm from './components/CreateForm';

const { Header, Footer, Content } = Layout;
const { Option } = Select;

function App() {
  const state = useGlobalState();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [cities, setCities] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteItemUuid, setDeleteItemUuid] = useState("");

  useEffect(() => {
    fetchPriceList();
    fetchAreaOptions();
    fetchSizeOptions();
  }, [])

  useEffect(() => {
    let areaTemp = Object.assign([], state.areaOptions())
    const citiesTemp = areaTemp.filter(city => city.province === selectedItem.area_provinsi)
    setCities(citiesTemp);
  }, [selectedItem])

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
    setDeleteItemUuid(uuid);
    setDeleteModalVisible(true);
  }

  const handleOkDelete = () => {
    state.deleteItem(deleteItemUuid);
    setDeleteModalVisible(false);
  };

  const handleChangeInput = async (event, key) => {
    let tempItem = Object.assign({}, selectedItem);
    tempItem[key] = event.target.value
    setSelectedItem(tempItem)
  }

  const handleChangeSelect = async (event, key) => {
    if(key === "area_provinsi") {
      let tempItem = Object.assign({}, selectedItem);
      tempItem[key] = event;
      tempItem['area_kota'] = null;
      setSelectedItem(tempItem);
    } else {
      let tempItem = Object.assign({}, selectedItem);
      tempItem[key] = event;
      setSelectedItem(tempItem);
    }
  }

  const save = async (uuid) => {
    state.updateItemList(uuid, selectedItem);
    setIsEdit(false);
  }

  const addData = () => {
    state.createFormToggle(true);
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
                <Input placeholder="Masukan Komoditas" value={selectedItem.komoditas} onChange={(event) => handleChangeInput(event, 'komoditas')} />
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
            <Select style={{width: '175px'}} placeholder="Pilih provinsi" value={selectedItem.area_provinsi} onChange={(event) => handleChangeSelect(event, 'area_provinsi')}>
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
            <Select style={{width: '175px'}} placeholder="Pilih area kota" value={selectedItem.area_kota} onChange={(event) => handleChangeSelect(event, 'area_kota')}>
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
            <Select placeholder="Pilih ukuran" value={selectedItem.size} onChange={(event) => handleChangeSelect(event, 'size')}>
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
            <Input placeholder="Masukan harga" value={selectedItem.price} onChange={(event) => handleChangeInput(event, 'price')} />
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
                <DatePicker
                  style={{
                    width: '100%',
                  }}
                  defaultValue={moment(selectedItem.tgl_parsed, 'YYYY-MM-DD')}
                  onChange={(date, dateString) => handleChangeSelect(dateString, 'tgl_parsed')}
                />
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
              <Button shape="circle" type="text" onClick={() => edit(row)} icon={<EditOutlined className="icon-green" />}></Button>
              <Button shape="circle" type="text" onClick={() => deleteItem(row.uuid)} icon={<DeleteOutlined className="icon-red" />}></Button>
            </div>
          }
        </div> 
      )
    },
  ];

  const customStyles = {
    headCells: {
        style: {
          fontSize: '14px',
          fontWeight: 'bolder',
          color: "#ffffff",
          backgroundColor: "#1890ff",
          minHeight: '56px',
          paddingLeft: '16px',
          paddingRight: '8px',
        },
    },
};

  return (
    <div className="App">
      <Layout>
        <Header>
          <h2 style={{color: "white"}}>
            DAFTAR HARGA KOMODITAS
          </h2>
        </Header>
        <Content className='content'>
          <Row style={{padding: '30px 0'}}>
            <Col span={12} style={{textAlign: 'left'}}>
              <h3>
                TABEL DAFTAR HARGA
              </h3>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <Button type="primary" shape="round" icon={<PlusCircleOutlined />} onClick={() => addData()}>
                Tambah Data
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card bordered={false}>
                <DataTable
                  columns={columns}
                  data={state.priceList()}
                  pagination
                  customStyles={customStyles}
                  progressPending={state.isLoading()}
                />
              </Card>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>efishery</Footer>
        <Modal 
          title="Hapus Item?" 
          visible={deleteModalVisible} 
          footer={[
            <Button key="back" onClick={() => setDeleteModalVisible(false)}>
              Batal
            </Button>,
            <Button key="submit" type="primary" onClick={() => handleOkDelete()} danger>
              Hapus
            </Button>,
          ]}
        >
          <ExclamationCircleOutlined style={{ fontSize: "32px", marginBottom: "10px", color: "#faad14" }} />
          <p style={{fontSize: "16px", fontWeight: 'bold', margin: 0}}>
            Data yang di hapus tidak dapat di lihat kembali.
          </p>
          <p>
            Apakah anda yakin ingin menghapus data ini?
          </p>
        </Modal>
      </Layout>
      <CreateForm />
    </div>
  );
}

export default App;
