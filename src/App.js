import './App.scss';
import { ReactElement, useEffect, useState } from "react";
import { Container, Row, Col } from 'react-grid-system';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { MdModeEdit, MdDelete, MdCheckCircle, MdCancel, MdOutlineAddCircle } from 'react-icons/md';

function App() {
  const [isEdit, setIsEdit] = useState(false);
  const [priceList, setPriceList] = useState([{
    "uuid": "b13596eb-796b-4a21-9251-cb4757309f8c",
    "komoditas": "BAWAL",
    "area_provinsi": "JAWA BARAT",
    "area_kota": "CILILIN",
    "size": "170",
    "price": "12000",
    "tgl_parsed": "2022-01-11T05:57:27Z",
    "timestamp": "1641880647737"
  },
  {
    "uuid": "46849403-c682-4720-96a6-1b56af13baa1",
    "komoditas": "NILA HITAM",
    "area_provinsi": "KALIMANTAN TIMUR",
    "area_kota": "BORNEO",
    "size": "80",
    "price": "7000",
    "tgl_parsed": "2022-01-12T05:43:35Z",
    "timestamp": "1641966215456"
  },
  {
    "uuid": "dec60f90-c3cd-47c3-aa80-895fdb008be4",
    "komoditas": "MAS",
    "area_provinsi": "SUMATERA UTARA",
    "area_kota": "MEDAN",
    "size": "130",
    "price": "58000",
    "tgl_parsed": "2022-01-12T16:29:16Z",
    "timestamp": "1642004956338"
  },
  {
    "uuid": "86bb7088-8388-4da3-a5fd-b7f29bd1522d",
    "komoditas": "PATIN",
    "area_provinsi": "DKI JAKARTA",
    "area_kota": "KOTA TUA",
    "size": "140",
    "price": "3000",
    "tgl_parsed": "2022-01-13T12:01:34Z",
    "timestamp": "1642075294288"
  },
  {
    "uuid": "421b62fc-2402-446a-be6d-3a5ad3f29edc",
    "komoditas": "NILA HITAM",
    "area_provinsi": "SULAWESI BARAT",
    "area_kota": "MAMUJU UTARA",
    "size": "100",
    "price": "32000",
    "tgl_parsed": "2022-01-14T13:04:53Z",
    "timestamp": "1642165493961"
  },
  {
    "uuid": "c3647ec9-b28b-48ba-8db8-9e464ac02eea",
    "komoditas": "LELE",
    "area_provinsi": "BALI",
    "area_kota": "BULELENG",
    "size": "120",
    "price": "5000",
    "tgl_parsed": "2022-01-14T20:43:58Z",
    "timestamp": "1642193038033"
  },
  {
    "uuid": "3fd3a1de-0280-4fc4-bc13-141f2d64d964",
    "komoditas": "LELE",
    "area_provinsi": "KALIMANTAN TIMUR",
    "area_kota": "BORNEO",
    "size": "40",
    "price": "93000",
    "tgl_parsed": "2022-01-16T00:50:04Z",
    "timestamp": "1642294204929"
  },
  {
    "uuid": "cce6ede6-f464-4e5a-b9d1-9161ad6fc5d5",
    "komoditas": "NILA MERAH",
    "area_provinsi": "JAWA TIMUR",
    "area_kota": "SITUBONDO",
    "size": "70",
    "price": "34000",
    "tgl_parsed": "2022-01-17T00:19:54Z",
    "timestamp": "1642378794567"
  },
  {
    "uuid": "a3168ed0-8e19-4bee-9a74-e310c09579f3",
    "komoditas": "LELE",
    "area_provinsi": "SUMATERA BARAT",
    "area_kota": "PADANG PARIAMAN",
    "size": "160",
    "price": "43000",
    "tgl_parsed": "2022-01-17T19:38:47Z",
    "timestamp": "1642448327707"
  },
  {
    "uuid": "9473ec58-8e69-4b13-a072-96d74256bda6",
    "komoditas": "BAWAL",
    "area_provinsi": "JAWA BARAT",
    "area_kota": "CILILIN",
    "size": "80",
    "price": "63000",
    "tgl_parsed": "2022-01-18T12:10:04Z",
    "timestamp": "1642507804040"
  },
  {
    "uuid": "8242a8e6-94ff-4905-8901-5491984011d5",
    "komoditas": "BANDENG",
    "area_provinsi": "JAWA BARAT",
    "area_kota": "CILILIN",
    "size": "200",
    "price": "56000",
    "tgl_parsed": "2022-01-19T07:14:07Z",
    "timestamp": "1642576447110"
  }]);
  const [areaOptions, setAreaOptions] = useState([
    {
      "province": "ACEH",
      "city": "ACEH KOTA"
    },
    {
      "province": "BALI",
      "city": "BULELENG"
    },
    {
      "province": "BANTEN",
      "city": "PANDEGLANG"
    },
    {
      "province": "DKI JAKARTA",
      "city": "KOTA TUA"
    },
    {
      "province": "JAWA BARAT",
      "city": "BANDUNG"
    },
    {
      "province": "JAWA BARAT",
      "city": "CIREBON"
    },
    {
      "province": "JAWA TENGAH",
      "city": "PEMALANG"
    },
    {
      "province": "JAWA TENGAH",
      "city": "CILACAP"
    },
    {
      "province": "JAWA TENGAH",
      "city": "PURWOREJO"
    },
    {
      "province": "JAWA TENGAH",
      "city": "TEGAL"
    },
    {
      "province": "JAWA TIMUR",
      "city": "JEMBER"
    },
    {
      "province": "JAWA TIMUR",
      "city": "BANYUWANGI"
    },
    {
      "province": "JAWA TIMUR",
      "city": "SITUBONDO"
    },
    {
      "province": "JAWA TIMUR",
      "city": "PROBOLINGGO"
    },
    {
      "province": "KALIMANTAN TIMUR",
      "city": "BORNEO"
    },
    {
      "province": "LAMPUNG",
      "city": "LAMPUNG TIMUR"
    },
    {
      "province": "SULAWESI BARAT",
      "city": "MAMUJU UTARA"
    },
    {
      "province": "SUMATERA BARAT",
      "city": "PADANG PARIAMAN"
    },
    {
      "province": "SUMATERA UTARA",
      "city": "MEDAN"
    },
    {
      "province": "JAWA BARAT",
      "city": "DEPOK"
    },
    {
      "province": "JAWA BARAT",
      "city": "CIMAHI"
    },
    {
      "province": "JAWA BARAT",
      "city": "CILILIN"
    },
    {
      "province": "JAWA BARAT",
      "city": "CILILIN"
    },
    {
      "province": "JAWA TENGAH",
      "city": " PURWOREJO"
    },
    {
      "province": "JAWA TENGAH",
      "city": " PURWOREJOL"
    },
    {
      "province": "JAWA TENGAH",
      "city": " PURWOREJOR"
    }
  ])
  const [sizeOptions, setSizeOptions] = useState([
    {
      "size": "30"
    },
    {
      "size": "40"
    },
    {
      "size": "50"
    },
    {
      "size": "60"
    },
    {
      "size": "70"
    },
    {
      "size": "80"
    },
    {
      "size": "90"
    },
    {
      "size": "100"
    },
    {
      "size": "110"
    },
    {
      "size": "120"
    },
    {
      "size": "130"
    },
    {
      "size": "140"
    },
    {
      "size": "150"
    },
    {
      "size": "160"
    },
    {
      "size": "170"
    },
    {
      "size": "180"
    },
    {
      "size": "190"
    },
    {
      "size": "200"
    },
    {
      "size": "20"
    }
  ])
  const [selectedItem, setSelectedItem] = useState({});

  const edit = async(data) => {
    console.log("edit", data)
    setIsEdit(!isEdit)
    setSelectedItem(data)
  }

  const deleteItem = async(uuid) => {
    console.log("delete Item", uuid)
  }

  const handleChangeInput = async(event, key) => {
    let tempItem = Object.assign({}, selectedItem);
    if(key === "area_provinsi") {
      const areaIndex = areaOptions.findIndex(x => x.province === event.target.value);
      tempItem[key] = event.target.value
      tempItem.area_kota = areaOptions[areaIndex].city
    } else {
      tempItem[key] = event.target.value
    }
    setSelectedItem(tempItem)
  }

  const save = async() => {
    console.log("save", selectedItem)
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
                areaOptions.map((data, index) => {
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
             <input type="text" id="city" name="city" value={selectedItem.area_kota} disabled />
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
                sizeOptions.map((data, index) => {
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
            <input type="text" id="price" name="price" value={selectedItem.price} />
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
               <input type="date" id="date" name="date" value={moment(selectedItem.tgl_parsed).format('YYYY-MM-DD')} />
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
                <button onClick={() => save()}>
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
            <h3>
              PRICE LIST
            </h3>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <DataTable
              columns={columns}
              data={priceList}
              // customStyles={customStyles} 
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
