const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'databasese',
  port: '3306'
 //pond
  // host: 'localhost',
  // user: 'root',
  // password: '12345678',
  // database: 'dbtest',


  // host: 'localhost',
  // user: 'root',
  // password: '',
  // database: 'project_se',
  // host: 'localhost',
  // user: 'root',
  // password: '',
  // database: 'tarangsorn',

  // host: 'localhost',
  // user: 'root',
  // password: '12345678',
  // database: 'project_se',

  // host: '192.168.43.237',
  // user: 'dbSE',
  // password: 'root123456',
  // database: 'databasese',
})

db.connect((err)=>{
  if(err){
    console.log('Error connecting to MySQL database =',err)
    return;
  }
  console.log('MySQL successfully')
})

app.post("/create", (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;

  // ตรวจสอบว่ามีอีเมลล์นี้ในฐานข้อมูลหรือไม่
  db.query(
      "SELECT * FROM allusers WHERE email = ?",
      [email],
      (err, result) => {
          if (err) {
              console.error('เกิดข้อผิดพลาดในการทำคำสั่ง SQL:', err);
              return res.status(500).send('Internal Server Error');
          } else if (result.length > 0) {
              // หากมีอีเมลล์นี้ในฐานข้อมูล
              return res.status(409).send('Email already exists');
          } else {
              // หากไม่มีอีเมลล์นี้ในฐานข้อมูล ให้ทำการเพิ่มข้อมูล
              db.query(
                  "INSERT INTO allusers (id,email, fullname) VALUES (2,?, ?)",
                  [email, fullName],
                  (err, result) => {
                      if (err) {
                          console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูล:', err);
                          return res.status(500).send('Failed to insert data');
                      } else {
                          return res.status(200).send('Values Inserted');
                      }
                  }
              );
          }
      }
  );
  });

  app.post("/upload", (req, res) => {
    const excelData = req.body.excelData;

    const values = excelData.map(() => "(2, ?)").join(", ");
  
    const sql = `INSERT INTO allusers (id,email, fullname) VALUES ${values}`;
  
    db.query(sql,excelData, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error inserting values");
      } else {
        res.send("Values Inserted");
      }
    });
  });
  
  app.post("/creates", (req, res) => {
    const fullName = req.body.fullName;
    const email = req.body.email;

    // ตรวจสอบว่ามีอีเมลล์นี้ในฐานข้อมูลหรือไม่
    db.query(
        "SELECT * FROM allusers WHERE email = ?",
        [email],
        (err, result) => {
            if (err) {
                console.error('เกิดข้อผิดพลาดในการทำคำสั่ง SQL:', err);
                return res.status(500).send('Internal Server Error');
            } else if (result.length > 0) {
                // หากมีอีเมลล์นี้ในฐานข้อมูล
                return res.status(409).send('Email already exists');
            } else {
                // หากไม่มีอีเมลล์นี้ในฐานข้อมูล ให้ทำการเพิ่มข้อมูล
                db.query(
                    "INSERT INTO allusers (id,email, fullname) VALUES (3,?, ?)",
                    [email, fullName],
                    (err, result) => {
                        if (err) {
                            console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูล:', err);
                            return res.status(500).send('Failed to insert data');
                        } else {
                            return res.status(200).send('Values Inserted');
                        }
                    }
                );
            }
        }
    );
});

  

  app.post("/uploads", (req, res) => {
    const excelData = req.body.excelData;

    const values = excelData.map(() => "(3, ?)").join(", ");
  
    const sql = `INSERT INTO allusers (id,email, fullname) VALUES ${values}`;
  
    db.query(sql,excelData, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error inserting values");
      } else {
        res.send("Values Inserted");
      }
    });
  });



app.get('/get',(req,res)=>{
    db.query("SELECT*FROM allusers where id=2 ORDER BY fullname",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.get('/get1',(req,res)=>{
  db.query("SELECT*FROM allusers where id=3 ORDER BY fullname",(err,result)=>{
      if(err){
          console.log(err);
      }else{
          res.send(result);
      }
  })
})


app.get('/searchsubject', (req, res) => {
  const searchText = req.query.searchText || '';

  // ใช้ prepared statement เพื่อป้องกัน SQL injection
  const sql = "SELECT * FROM course WHERE subject_name LIKE ?";

  db.query(sql, [`%${searchText}%`], (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
      } else {
          // ตรวจสอบว่ามีข้อมูลหรือไม่
          if (result.length > 0) {
              // แปลงผลลัพธ์เป็น JSON
              res.json(result);
          } else {
              // ถ้าไม่มีข้อมูล
              res.json({ message: 'No results found.' });
          }
      }
  });
});




app.get('/api/rowCount', (req, res) => {
  const query = 'SELECT COUNT(*) AS rowCount FROM allusers where id=2';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const rowCount = result[0].rowCount;
      res.json({ rowCount });
    }
  });
});

app.get('/api/rowCount1', (req, res) => {
  const query = 'SELECT COUNT(*) AS rowCount FROM allusers where id=3';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const rowCount = result[0].rowCount;
      res.json({ rowCount });
    }
  });
});

app.post("/addroom", (req, res) => {
  const excelData = req.body.excelData;
  
  // สร้างคำสั่ง SQL เพื่อลบข้อมูลที่มี state = 1 ออกจากตาราง room
  const deleteSql = `DELETE FROM room WHERE state = 1`;

  db.query(deleteSql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting values");
      return; // หยุดการทำงานเมื่อเกิดข้อผิดพลาด
    }

    // หลังจากลบข้อมูลเสร็จสิ้น ก็ทำการแทรกข้อมูลใหม่ลงในฐานข้อมูล
    const values = excelData.map(() => "(?, 1)").join(", ");
    const insertSql = `INSERT INTO room (building, room, quantity, state) VALUES ${values}`;

    db.query(insertSql, excelData, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error inserting values");
      } else {
        res.send("Values Inserted");
      }
    });
  });
});


app.get('/getsub', (req, res) => {
  db.query("SELECT * FROM course ORDER BY courseid", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/getOpenCourseList', (req, res) => {
  db.query("SELECT * FROM opencourse ORDER BY courseid", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/getsubsearch/:year', (req, res) => {
  const {year} =req.params;
  db.query("SELECT * FROM course where course_year = ? ORDER BY courseid",[year],(err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/uploaded", (req, res) => {
  const excelData = req.body.excelData;
  const selectedValue1 = req.body.selectedValue1;
  const selectcourse=req.body.selectcourse;

  console.log(selectedValue1);

  const modifiedExcelData = excelData.map(data => {
    // data.push(selectedValue1);
 
    return [selectcourse,selectedValue1, ...data];
  });

  const values = modifiedExcelData.map(() => "(?,?,?,?,?,?)").join(", ");

  const sql = `INSERT INTO course (courses,course_year,subject_id,subject_name,credit,category ) VALUES ${values}`;

  db.query(sql, modifiedExcelData.flat(), (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error inserting values");
    } else {
      res.send("Values Inserted");
    }
  });
});



app.post("/addsub", (req, res) => {
  const idSubject = req.body.idSubject;
  const subjectName = req.body.subjectName;
  const selectedValue2=req.body.selectedValue2;
  const selectedValue3=req.body.selectedValue3;
  const selectedValue4=req.body.selectedValue4;
  const selectcourse1=req.body.selectcourse1;

  db.query(
    "INSERT INTO course (courses,course_year,subject_id,subject_name,credit,category ) VALUES (?,?,?,?,?,?)",
    [selectcourse1,selectedValue2,idSubject,subjectName,selectedValue4,selectedValue3],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred while inserting values into the database.");
      } else {
        console.log(selectcourse1);
        res.send("Values Inserted");
      }
    }
  );
});

// app.post("/opencourse", (req, res) => {
//   const setListCheck = req.body.setListCheck;

//   const values = setListCheck.map(() => "(?,?,?,?)").join(", ");

//   db.query(
//     "INSERT INTO opencourse (subject_id,subject_name,credit,category ) VALUES (?)",
//     [values],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("An error occurred while inserting values into the database.");
//       } else {
//         console.log("Values Inserted");
//         res.send("Values Inserted");
//       }
//     }
//   );
// });


// app.post("/opencourse", (req, res) => {
//   const listCheck= req.body.listCheck; // รับข้อมูลที่ส่งมาจากหน้าเว็บ
//   const values = listCheck.map(item => [item.id, item.subjectName, item.credit, item.category]); // สร้างรายการของค่าแทนที่ในรูปแบบของ parameterized queries

//   // สร้างสตริงของคำสั่ง SQL ที่มี parameterized queries
//   const query = "INSERT INTO opencourse (subject_id, subject_name, credit, category) VALUES ?";

//   db.query(query, [values], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("An error occurred while inserting values into the database.");
//     } else {
//       console.log("Values Inserted");
//       res.send("Values Inserted");
//     }
//   });
// });

app.get('/getsubsearch1/:year/:term', (req, res) => {
  const { year, term } = req.params;

  let sqlQuery;
  let sqlParams;

  if (term == "ทั้งหมด") {
    sqlQuery = "SELECT * FROM opencourse WHERE course_year = ? AND (term = 'ภาคต้น' OR term = 'ภาคปลาย') ORDER BY courseid";
    sqlParams = [year];
  } else {
    sqlQuery = "SELECT * FROM opencourse WHERE course_year = ? AND (term = ? ) ORDER BY courseid";
    sqlParams = [year, term];
  }

  db.query(sqlQuery, sqlParams, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(term);
     
    }
  });
});



app.post("/opencourse", (req, res) => {
  const listCheck = req.body.listCheck; // รับข้อมูลที่ส่งมาจากหน้าเว็บ
  const termChecked=req.body.termChecked;
  const values = listCheck.map(item => [ item.courses,item.course_year, item.id, item.subjectName, item.credit, item.category]);

  // สร้างสตริงของคำสั่ง SQL ที่มี parameterized queries
  const insertQuery = "INSERT INTO opencourse (courses,course_year, subject_id, subject_name, credit, category,term,state) VALUES ?";
  const selectQuery = "SELECT * FROM opencourse WHERE subject_id = ? AND subject_name = ? AND course_year = ?";

  // สร้าง Promise เพื่อให้มั่นใจว่าคำสั่ง SQL ถูกทำสำเร็จหรือไม่
  const insertValuesPromises = listCheck.map(item => {
    return new Promise((resolve, reject) => {
      db.query(selectQuery, [item.id, item.subjectName, item.course_year], (checkErr, checkResult) => {
        if (checkErr) {
          console.error(checkErr);
          reject(checkErr);
        } else {
          if (checkResult.length > 0) {
            console.log("Data already exists for subject_id, subject_name, and course_year:", item.id, item.subjectName, item.course_year);
            resolve({ id: item.id, exists: true }); // ส่งข้อมูลว่าข้อมูลมีอยู่แล้ว
          } else {
            const singleValue = [[ item.courses,item.course_year, item.id, item.subjectName, item.credit, item.category,termChecked,1]];
            db.query(insertQuery, [singleValue], (err, result) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                console.log("Values Inserted");
                resolve(result);
              }
            });
          }
        }
      });
    });
  });

  // รอให้ทุก Promise ใน insertValuesPromises เสร็จสมบูรณ์ก่อนที่จะส่งผลลัพธ์กลับ
  Promise.all(insertValuesPromises)
    .then(results => {
      // ส่งผลลัพธ์กลับหลังจากที่ทุกคำสั่ง SQL เสร็จสมบูรณ์
      res.send("All values inserted successfully");
    })
    .catch(error => {
      // หากเกิดข้อผิดพลาดในการทำคำสั่ง SQL ใด ๆ
      res.status(500).send("Error inserting values");
    });
});

app.delete("/deletesuball", (req, res) => {
  const listCheck = req.body.listCheck; // รับข้อมูลที่ส่งมาจากหน้าเว็บ
  const deleteQuery = "DELETE FROM course WHERE subject_id = ? AND subject_name = ? AND course_year = ?";
  
  // สร้าง Promise เพื่อลบข้อมูลทั้งหมดใน listCheck
  const deleteValuesPromises = listCheck.map(item => {
    return new Promise((resolve, reject) => {
      db.query(deleteQuery, [item.id, item.subjectName, item.course_year], (err, result) => {
        if (err) {
          console.error("Error deleting data:", err);
          reject(err);
        } else {
          console.log("Data deleted for :", item.id, item.subjectName, item.course_year);
          resolve(result);
        }
      });
    });
  });

  // รอให้ทุก Promise ใน deleteValuesPromises เสร็จสมบูรณ์ก่อนที่จะส่งผลลัพธ์กลับ
  Promise.all(deleteValuesPromises)
    .then(results => {
      // ส่งผลลัพธ์กลับหลังจากที่ทุกคำสั่ง SQL เสร็จสมบูรณ์
      res.send("All values deleted successfully");
    })
    .catch(error => {
      // หากเกิดข้อผิดพลาดในการทำคำสั่ง SQL ใด ๆ
      res.status(500).send("Error deleting values");
    });
});

app.delete("/deletesuball", (req, res) => {
  const listCheck = req.body.listCheck; // รับข้อมูลที่ส่งมาจากหน้าเว็บ
  const deleteQuery = "DELETE FROM course WHERE subject_id = ? AND subject_name = ? AND course_year = ?";
  
  // สร้าง Promise เพื่อลบข้อมูลทั้งหมดใน listCheck
  const deleteValuesPromises = listCheck.map(item => {
    return new Promise((resolve, reject) => {
      db.query(deleteQuery, [item.id, item.subjectName, item.course_year], (err, result) => {
        if (err) {
          console.error("Error deleting data:", err);
          reject(err);
        } else {
          console.log("Data deleted for :", item.id, item.subjectName, item.course_year);
          resolve(result);
        }
      });
    });
  });

  // รอให้ทุก Promise ใน deleteValuesPromises เสร็จสมบูรณ์ก่อนที่จะส่งผลลัพธ์กลับ
  Promise.all(deleteValuesPromises)
    .then(results => {
      // ส่งผลลัพธ์กลับหลังจากที่ทุกคำสั่ง SQL เสร็จสมบูรณ์
      res.send("All values deleted successfully");
    })
    .catch(error => {
      // หากเกิดข้อผิดพลาดในการทำคำสั่ง SQL ใด ๆ
      res.status(500).send("Error deleting values");
    });
});



app.get('/box', (req, res) => {
    db.query("SELECT * FROM box", (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result); // ส่งผลลัพธ์กลับไปยังผู้ใช้
      }
    });
  });

app.post('/box1', (req, res) => {
    const { inputValue } = req.body;

    if(!inputValue){
      return res.status(400).json({ error: 'error'});
    }
  
    db.query("INSERT INTO `box` (id,info) VALUES (null,?)", [inputValue], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ success: true, message: 'Data saved successfully' });
        console.log("บันทึกสำเร็จ")
      }
    });
  });

app.get('/time', (req, res) => {
    db.query("SELECT * FROM time ", (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result); // ส่งผลลัพธ์กลับไปยังผู้ใช้
        console.log("อ่านข้อมูลสำเร็จ")
      }
    });
  });

  app.post('/timeT', (req, res) => {
    const { dayS, timeS, dayF, timeF } = req.body;

    if(!dayS || !timeS || !dayF || !timeF){
      return res.status(400).json({ error: 'error'});
    }
  
    db.query("DELETE FROM timeteacher WHERE state = 1", (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.log(deleteErr);
        return res.status(500).json({ error: 'Internal Server Error (Delete)' });
      } else {
        console.log("Deleted records successfully");
        // หลังจากลบข้อมูลแล้ว ทำการแทรกข้อมูลใหม่
        db.query("INSERT INTO timeteacher (`id`, `dayS`, `timeS`, `dayF`, `timeF`,`state`) VALUES (NULL, ? , ? ,? , ? ,1 )", [dayS, timeS, dayF, timeF], (insertErr, insertResult) => {
          if (insertErr) {
            console.log(insertErr);
            return res.status(500).json({ error: 'Internal Server Error (Insert)' });
          } else {
            console.log("บันทึกสำเร็จ");
            return res.json({ success: true, message: 'Data saved successfully' });
          }
        });
      }
    });
  });

  app.post('/timeEdu', (req, res) => {
    const { dayS, timeS, dayF, timeF } = req.body;

    if(!dayS || !timeS || !dayF || !timeF){
      return res.status(400).json({ error: 'error'});
    }
  
    db.query("DELETE FROM timeedu WHERE state = 1", (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.log(deleteErr);
        return res.status(500).json({ error: 'Internal Server Error (Delete)' });
      } else {
        console.log("Deleted records successfully");
        // หลังจากลบข้อมูลแล้ว ทำการแทรกข้อมูลใหม่
        db.query("INSERT INTO timeedu (`id`, `dayS`, `timeS`, `dayF`, `timeF`,`state`) VALUES (NULL, ? , ? ,? , ? ,1 )", [dayS, timeS, dayF, timeF], (insertErr, insertResult) => {
          if (insertErr) {
            console.log(insertErr);
            return res.status(500).json({ error: 'Internal Server Error (Insert)' });
          } else {
            console.log("บันทึกสำเร็จ");
            return res.json({ success: true, message: 'Data saved successfully' });
          }
        });
      }
    });
});


  app.delete('/box1/:boxId', (req, res) => {
    const boxId = req.params.boxId;
    // ทำการลบข้อมูลในฐานข้อมูล MySQL ตามดัชนีที่รับมาจาก params
    // ส่งคำตอบกลับไปว่าลบข้อมูลสำเร็จหรือไม่

    if(!boxId){
        return res.status(400).json({ error: 'error'});
    }
  
    db.query("DELETE FROM `box` WHERE id=?", [boxId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ success: true, message: 'Data saved successfully' });
            console.log("ลบสำเร็จ")
        }
    });
});

app.delete('/delete/:userEmail', (req, res) => {
  const userEmail = req.params.userEmail;
  db.query("DELETE FROM allusers WHERE email = ?", [userEmail], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Error deleting data');
    } else {
      console.log('Deleted user with email:', userEmail);
      res.status(200).send('Data deleted successfully');
    }
  });
});

app.delete('/deletesub/:courses', (req, res) => {
  const courses = req.params.courses;
  db.query("DELETE FROM course WHERE courseid = ?", [courses], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Error deleting data');
    } else {
      console.log('Deleted user with email:', courses);
      res.status(200).send('Data deleted successfully');
    }
  });
});

app.delete('/deleteopensuball/:courses', (req, res) => {
  const courses = req.params.courses;
  db.query("DELETE FROM opencourse WHERE state = 1", [courses], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Error deleting data');
    } else {
      console.log('Deleted user with email:', courses);
      res.status(200).send('Data deleted successfully');
    }
  });
});

app.delete('/deleteopencourse/:courses', (req, res) => {
  const courses = req.params.courses;
  db.query("DELETE FROM opencourse WHERE courseid = ?", [courses], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Error deleting data');
    } else {
      console.log('Deleted user with email:', courses);
      res.status(200).send('Data deleted successfully');
    }
  });
});

app.delete('/delete1/:userEmail', (req, res) => {
  const userEmail = req.params.userEmail;
  db.query("DELETE FROM allusers WHERE email = ?", [userEmail], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Error deleting data');
    } else {
      console.log('Deleted user with email:', userEmail);
      res.status(200).send('Data deleted successfully');
    }
  });
});


  
app.get('/room', (req, res) => {
    db.query("SELECT * FROM room", (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result); // ส่งผลลัพธ์กลับไปยังผู้ใช้
        console.log("อ่านข้อมูลสำเร็จ")
      }
    });
  });

app.get('/courset', (req, res) => {
  db.query("SELECT * FROM courset", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result); // ส่งผลลัพธ์กลับไปยังผู้ใช้
      console.log("สำเร็จ")
    }
  });
});


app.get("/search-courses", (req, res) => {
  const { query, checkboxValue, selectterm, selectyear } = req.query;

  const courseValues = checkboxValue
    .split(",")
    .filter(course => ["55", "60", "65"].includes(course));

  if (courseValues.length === 0) {
    return res.json([]);
  }

  let sqlQuery = `SELECT DISTINCT subject_id, subject_name, credit, category FROM opencourse WHERE courses IN (${courseValues.map(() => '?').join(', ')})`;

  let queryParams = [...courseValues];

  // เพิ่มเงื่อนไขสำหรับ selectterm และ selectyear
  if (selectterm && selectyear) {
    sqlQuery += ` AND term = ? AND course_year = ?`;
    queryParams.push(selectterm, selectyear);
  }

  // If a search query is provided, extend the SQL query to include a search condition.
  if (query) {
    sqlQuery += ` AND (subject_id LIKE ? OR subject_name LIKE ?)`;
    queryParams.push(`%${query}%`, `%${query}%`); // Add the search query to the parameters array for both subject_id and subject_name.
  }

  db.query(sqlQuery, queryParams, (err, results) => {
    if (err) {
      console.error("Error searching courses:", err);
      return res.status(500).send("Error searching courses");
    }
    res.json(results);
  });
});


app.post("/register", (req, res) => {
  const {
    subject_id,
    subject_name,
    section,
    lectureOrLab,
    branch,
    years,
    credit,
    category,
    
  } = req.body;

  // Check for missing data
  const missingFields = [];
  if (!subject_id) missingFields.push("subject_id");
  if (!subject_name) missingFields.push("subject_name");
  if (!section) missingFields.push("section");
  if (!lectureOrLab) missingFields.push("lectureOrLab");
  if (!branch) missingFields.push("branch");
  if (!years) missingFields.push("years");
  if (!credit) missingFields.push("credit");
  if (!category) missingFields.push("category");

  if (missingFields.length > 0) {
    return res
      .status(400)
      .send(`Missing required fields: ${missingFields.join(", ")}`);
  }

  const query =
    "INSERT INTO registration_records (subject_id, subject_name, section, lectureOrLab, branch, years, credit, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [
      subject_id,
      subject_name,
      section,
      lectureOrLab,
      branch,
      years,
      credit,
      category,
    ],
    (err, results) => {
      if (err) {
        console.error("Failed to insert registration_records:", err);
        return res
          .status(500)
          .send(
            "Error saving registration_records. Please contact support if this issue persists."
          );
      }
      res
        .status(201)
        .send({
          message: "Registration successful",
          registrationId: results.insertId,
        }); // Assuming 'results.insertId' is available and relevant
    }
  );
});

// GET endpoint for retrieving 'ภาคปฏิบัติ' data
app.get('/practical-courses', (req, res) => {
  const query = 'SELECT * FROM registration_records WHERE lectureOrLab = "ภาคปฏิบัติ"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Failed to retrieve practical courses: ', err);
      return res.status(500).send('Error retrieving practical courses');
    }
    res.json(results);
  });
});

// GET endpoint for retrieving 'ภาคบรรยาย' data
app.get('/lecture-courses', (req, res) => {
  const query = 'SELECT * FROM registration_records WHERE lectureOrLab = "ภาคบรรยาย"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Failed to retrieve lecture courses: ', err);
      return res.status(500).send('Error retrieving lecture courses');
    }
    res.json(results);
  });
});

// GET endpoint for retrieving all registration data
app.get('/registration-data', (req, res) => {
  const query = 'SELECT * FROM registration_records';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Failed to retrieve registration data: ', err);
      return res.status(500).send('Error retrieving registration data');
    }
    res.json(results);
  });
});
app.get('/registall-data', (req, res) => {
  const query = 'SELECT * FROM courset';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Failed to retrieve registration data: ', err);
      return res.status(500).send('Error retrieving registration data');
    }
    res.json(results);
  });
});

app.get("/course-sections/:courseId", (req, res) => {
  const { courseId } = req.params;
  const query = "SELECT section FROM registration_records WHERE id = ?";
  db.query(query, [courseId], (err, results) => {
    if (err) {
      console.error("Failed to retrieve sections:", err);
      return res.status(500).send("Error retrieving sections");
    }
    res.json(results);
  });
});

app.delete('/delete-course/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM registration_records WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Failed to delete course:', err);
      return res.status(500).send('Error deleting course');
    }
    res.send('Course deleted successfully');
  });
});

// app.get('/schedule', (req, res) => {
//   // Construct SQL query to get the relevant data
//   // The SQL query will depend on your database schema
//   const query = `
//       SELECT courses.id, courses.sbj_code, courses.sbj_name, courses.sbj_num, courses.lab_or_lec,
//              schedules.sec, schedules.name, schedules.number, schedules.branch,
//              schedules.day, schedules.time, schedules.room
//       FROM courses
//       JOIN schedules ON courses.id = schedules.course_id`;

//   db.query(query, (err, results) => {
//       if (err) {
//           console.error('Error fetching schedule:', err);
//           res.status(500).send('Error fetching schedule');
//       } else {
//           res.json(results);
//       }
//   });
// });

app.get('/course-sections/:courseId', (req, res) => {
  const { courseId } = req.params;
  const query = 'SELECT section FROM registration_records WHERE id = ?';
  db.query(query, [courseId], (err, results) => {
    if (err) {
      console.error('Failed to retrieve sections:', err);
      return res.status(500).send('Error retrieving sections');
    }
    res.json(results);
  });
});

app.get('/checkUserRole', (req, res) => {
  const { emailUser } = req.query;

  // ค้นหาในตาราง allusers โดยใช้ email
  db.query('SELECT * FROM allusers WHERE email = ?', [emailUser], (err, userResult) => {
    if (err) throw err;
    if (userResult.length > 0) {
      const { id, fullname, email } = userResult[0];
      if (id === 1) {
        res.json({ role: 'admin', fullname, email });
      } else if (id === 2) {
        res.json({ role: 'teacher', fullname, email });
      } else if (id === 3) {
        res.json({ role: 'edu', fullname, email });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

app.listen("3001", () => {
    console.log('Server is running on port 3001');
})

app.get('/search-nameajarn', (req, res) => {
  const { query } = req.query; // รับคำค้นหาจาก query string
  const sql = 'SELECT * FROM allusers WHERE id=2 and fullname LIKE ?';
  db.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
    if (err) {
      console.error('Error searching name_ajarn:', err);
      return res.status(500).send('Error searching name_ajarn');
    }
    res.json(results); 
  });
});

app.get('/search-nameEdu', (req, res) => {
  const { query } = req.query; // รับคำค้นหาจาก query string
  const sql = 'SELECT * FROM allusers WHERE id=2 and fullname LIKE ?';
  db.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
    if (err) {
      console.error('Error searching name_edu:', err);
      return res.status(500).send('Error searching name_edu');
    }
    res.json(results); 
  });
});

app.get('/searchbarcourses', (req, res) => {
  const { query } = req.query; // รับคำค้นหาจาก query string
  // ตัวอย่างคำสั่ง SQL สำหรับค้นหาในตาราง courses
  const sql = 'SELECT * FROM course WHERE subject_id LIKE ? OR subject_name LIKE ?';
  db.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
    if (err) {
      console.error('Error searching courses:', err);
      return res.status(500).send('Error searching courses');
    }
    res.json(results); // ส่งข้อมูลรายวิชาที่ค้นหาได้กลับไปยัง frontend
  });
});
