import React from 'react';
import './ResultTableTeacherRed.css'; // Import CSS file for table styling
import Axios from 'axios';

class ResultTableTeacherRed extends React.Component {
  state = {
    registrationData: [],
    isLoading: true, // Add isLoading to state
    error: null, // Track any errors
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    // Check if myyear2 or termsearch props have changed
    if (this.props.myyear2 !== prevProps.myyear2 || this.props.termsearch !== prevProps.termsearch) {
      this.fetchData();
    }
  }
  

  fetchData = async () => {
    this.setState({ isLoading: true, error: null }); // Reset loading state and clear errors
    const name = sessionStorage.getItem("name")
    try {
      const { myyear2, termsearch } = this.props;
      const response = await Axios.get(`http://127.0.0.1:3001/registall-data?myyear2=${myyear2}&termsearch=${termsearch}&name=${name}`);
      this.setState({
        registrationData: response.data,
        isLoading: false, // Data fetched, loading done
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  render() {
    const { registrationData, isLoading, error } = this.state;

    if (isLoading) return <div>Loading...</div>; // Loading feedback
    if (error) return <div>Error: {error}</div>; // Error handling

    return (
      <div style={{marginBottom:'30px'}}>
        <header className="ResultTableTeacherRed-Texthead">
          <table className="ResultTableTeacherRed-bordered-table">
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
              {registrationData.map((course, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{course.idsubject}</td>
                  <td>{course.name}</td>
                  <td>{course.credit}</td>
                  <td>{course.lab_lec}</td>
                  <td>{course.sec}</td>
                  <td>{course.teacher}</td>
                  <td>{course.n_people}</td>
                  <td>{course.class_year}</td>
                  <td>{course.day}</td>
                  <td>{course.time_start}-{course.time_end}</td>
                  <td>{course.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default ResultTableTeacherRed;
