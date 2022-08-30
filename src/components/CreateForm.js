import 'antd/dist/antd.css'; 
import { Button, DatePicker, Drawer, Form, Input, Select, Space, Row, Col } from 'antd';
import { ReactElement, useEffect, useState } from "react";
import moment from 'moment';
import { useGlobalState } from '../providers/hookstateProvider';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

function CreateForm() {
  const [form] = Form.useForm();
  const state = useGlobalState();
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

  const onClose = () => {
    state.createFormToggle(false);
    form.resetFields();
  };

  useEffect(() => {
    let areaTemp = Object.assign([], state.areaOptions())
    const citiesTemp = areaTemp.filter(city => city.province === newData.area_provinsi)
    setCities(citiesTemp);
  }, [newData])

  const handleChangeInputNew = async (event, key) => {
    let tempItem = Object.assign({}, newData);
    tempItem[key] = event.target.value
    setNewdata(tempItem)
  }

  const handleChangeSelectNew = async (event, key) => {
    let tempItem = Object.assign({}, newData);
    tempItem[key] = event
    setNewdata(tempItem)
  }

  const saveNewData = () => {
    state.createFormToggle(false);
    let newDataTemp = Object.assign({}, newData);

    newDataTemp.uuid = uuidv4();
    newDataTemp.tgl_parsed = moment(newDataTemp.tgl_parsed).format("YYYY-MM-DDTHH:mm:SSZ");
    newDataTemp.timestamp = Math.floor(new Date(newDataTemp.tgl_parsed).getTime() / 1000);

    state.saveNewData(newDataTemp);
    form.resetFields();
  }


  return (
    <Drawer
        title="Tambah Data Baru"
        onClose={onClose}
        visible={state.createFormVisible()}
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
        <Form layout="vertical" form={form} hideRequiredMark>
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
  );
}

export default CreateForm;
