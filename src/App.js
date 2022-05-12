import logo from './logo.svg';
import './App.css';
import './S1.css';
import {useState} from 'react';

const initialState = {
    rollno: '',
    name: '',
    subject1: '',
    subject2: '',
    subject3: '',
    subject4: '',
    subject5: '',
}

function App() {

    const [maindata, setmaindata] = useState([])
    const [studentDetail, setStudentDetail] = useState(initialState)
    const [editdata, seteditdata] = useState(false);
    const [editdata1, seteditdata1] = useState('');


    const onsubmit = () => {
        debugger;
        const clone = [...maindata];
        if (editdata && editdata1) {
            clone[editdata1] = studentDetail
        } else {
            clone.push(studentDetail)
        }
        setmaindata(clone);
        setStudentDetail(initialState)
        seteditdata1("");
        seteditdata(false);
    }

    const deletehandler = (i) => {
        maindata.splice(i, 1);
        setmaindata([...maindata]);
    }

    const edithandler = (item, i) => {
        seteditdata(true);
        seteditdata1(i);
        setStudentDetail({...item})

    }

    const onChangeText = (event) => {
        setStudentDetail({...studentDetail, [event.target.name]: event.target.value})
    }


    return (
        <div className='App'>
            <h1 className='h1'>STUDENT RESULT</h1>
            <div>
                <form>
                    <table align='center' border='1px solid black'>
                        <tr>
                            <td>RNO</td>
                            <td>NAME</td>
                            <td>subject1</td>
                            <td>subject2</td>
                            <td>subject3</td>
                            <td>subject4</td>
                            <td>subject5</td>
                        </tr>
                        <tr>
                            <td><input type='number' value={studentDetail.rollno} name="rollno" onChange={onChangeText}/></td>
                            <td><input type='text' value={studentDetail.name} name="name"  onChange={onChangeText}/></td>
                            <td><input type='number' value={studentDetail.subject1} name="subject1" onChange={onChangeText}/></td>
                            <td><input type='number' value={studentDetail.subject2} name="subject2" onChange={onChangeText}/></td>
                            <td><input type='number' value={studentDetail.subject3} name="subject3" onChange={onChangeText}/></td>
                            <td><input type='number' value={studentDetail.subject4} name="subject4" onChange={onChangeText}/></td>
                            <td><input type='number' value={studentDetail.subject5} name="subject5" onChange={onChangeText}/></td>
                        </tr>
                    </table>
                    <input type='button' value='SUBMIT' onClick={onsubmit} style={{marginTop: '20px'}}/>
                </form>
            </div>
            <div>
                <table align='center' border='1px solid black' style={{marginTop: '20px', width: '60%',}}>
                    <tr>
                        <td>Id</td>
                        <td>RNO</td>
                        <td>NAME</td>
                        <td>subject1</td>
                        <td>subject2</td>
                        <td>subject3</td>
                        <td>subject4</td>
                        <td>subject5</td>
                        <td>Total</td>
                        <td>Percentage</td>
                    </tr>
                    {
                        maindata.map((item, i) => {
                            let sum = Number(item.subject1) + Number(item.subject2) + Number(item.subject3) + Number(item.subject4) + Number(item.subject5);
                            let avg = (Number(item.subject1) + Number(item.subject2) + Number(item.subject3) + Number(item.subject4) + Number(item.subject5)) / 5;
                            let failCount = 0;
                            Object.keys((item)).map((key) => {
                                if (key !== "rollno" && key !== "name") {
                                    if (Number(item[key]) < 35) {
                                        failCount = failCount + 1;
                                    }
                                }
                            })
                            return (
                                <tr style={{backgroundColor: failCount >= 1 ? "green" : "pink"}}>
                                    <td>{i}</td>
                                    <td>{item.rollno}</td>
                                    <td>{item.name}</td>                                
                                    <td>{item.subject1}</td>
                                    <td>{item.subject2}</td>
                                    <td>{item.subject3}</td>
                                    <td>{item.subject4}</td>
                                    <td>{item.subject5}</td>
                                    <td>{sum}</td>
                                    <td>{avg}</td>
                                    <td><input type="button" value="EDIT" onClick={() => {
                                        edithandler(item, i)
                                    }}/></td>
                                    <td><input type="button" value="DELETE" onClick={() => {
                                        deletehandler(i)
                                    }}/></td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    );
}

export default App;




