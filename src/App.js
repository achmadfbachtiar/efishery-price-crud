import './App.scss';
import { ReactElement, useEffect, useState } from "react";
import { Container, Row, Col } from 'react-grid-system';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { MdModeEdit, MdDelete, MdCheckCircle, MdCancel, MdOutlineAddCircle } from 'react-icons/md';
import { useGlobalState } from './providers/hookstateProvider';
const SteinStore = require("stein-js-client");
const store = new SteinStore(
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
);

function App() {
  const state = useGlobalState();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [cities, setCities] = useState([]);

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
    console.log("delete Item", uuid)
  }

  const handleChangeInput = async (event, key) => {
    let tempItem = Object.assign({}, selectedItem);
    tempItem[key] = event.target.value
    setSelectedItem(tempItem)
  }

  const save = async (uuid) => {
    state.updateItemList(uuid, selectedItem)
    setIsEdit(false);
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
                <button onClick={() => save(row.uuid)}>
                  <MdCheckCircle color={'green'} size={16} />
                </button>
                <button onClick={() => setIsEdit(false)}>
                  <MdCancel color={'red'} size={16} />
                </button>
              </div>
              :
              <div>
                <button onClick={() => edit(row)}>
                  <MdModeEdit color={'green'} size={16} />
                </button>
                <button onClick={() => deleteItem(row.uuid)}>
                  <MdDelete color={'red'} size={16} />
                </button>
              </div>
          :
            <div>
              <button onClick={() => edit(row)}>
                <MdModeEdit color={'green'} size={16} />
              </button>
              <button onClick={() => deleteItem(row.uuid)}>
                <MdDelete color={'red'} size={16} />
              </button>
            </div>
          }
        </div> 
      )
    },
  ];

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <button>
              Tambah data
            </button>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <DataTable
              title="Daftar Harga"
              columns={columns}
              data={state.priceList()}
              pagination
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
