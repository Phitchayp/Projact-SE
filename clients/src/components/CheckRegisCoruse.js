import React from 'react';
import './CheckRegisCoruse.css'; // Import CSS file for table styling
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


class CheckRegisCoruse extends React.Component {
  
  render() {
    return (
      <div className='CheckRegisCoruse-right'>
        {/* ตารางผลการลงทะเบียน */}
        <header className="CheckRegisCoruse-Texthead">
        <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mb-3"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="EXPORT TO EXCEL"/>
          <table className="CheckRegisCoruse-bordered-table" id="table-to-xls">
            <thead>
              <tr>
                <th>No.</th>
                <th>รหัสวิชา</th>
                <th>ชื่อวิชา</th>
                <th>นก.</th>
                <th>lab/lec</th>
                <th>sec</th>
                <th>ชื่อผู้สอน</th>
                <th>จำนวนนิสิต</th>
                <th>ชั้นปี</th>
                <th>วัน</th>
                <th>เวลา</th>
                <th>ห้องlab</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>03603213-65</td>
                <td>Algorithm Design and Analysis</td>
                <td>3</td>
                <td>lec</td>
                <td>800</td>
                <td className="CheckRegisCoruse-blue-text">สมเกียรติ  ใจดี</td>
                <td>100</td>
                <td>2 3 4 x</td>
                <td className="CheckRegisCoruse-blue-text">Mon</td>
                <td>9-12</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>03603423-60</td>
                <td>Industrial Sociology</td>
                <td>3</td>
                <td>lec</td>
                <td>800</td>
                <td className="CheckRegisCoruse-blue-text">สมศรี  มีใจ</td>
                <td>50</td>
                <td>3 4 x</td>
                <td className="CheckRegisCoruse-blue-text">Mon</td>
                <td>13-16</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>03600390-00</td>
                <td>Social Problems</td>
                <td>3</td>
                <td>lec</td>
                <td>800</td>
                <td className="CheckRegisCoruse-blue-text">สมเกียรติ  ใจดี</td>
                <td>100</td>
                <td>3 4 x</td>
                <td className="CheckRegisCoruse-blue-text">Mon</td>
                <td>16-19</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>03603452-60</td>
                <td>Lab Electronic</td>
                <td>1</td>
                <td>lab</td>
                <td>830</td>
                <td className="CheckRegisCoruse-blue-text">สมเกียรติ  ใจดี</td>
                <td>50</td>
                <td>3 4 x</td>
                <td className="CheckRegisCoruse-blue-text">Mon</td>
                <td>8-9</td>
                <td>lab15</td>

              </tr>
            </tbody>
          </table>
        </header> 
      </div>
    );
  }
}
export default CheckRegisCoruse;