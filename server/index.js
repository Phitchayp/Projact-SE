const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  // host: '127.0.0.1',
  // user: 'root',
  // password: '123456',
  // database: 'databasese',
  // port: '3306'

  // host: 'localhost',
  // user: 'root',
  // password: '12345678',
  // database: 'dbtest',
  // host: 'localhost',
  // user: 'root',
  // password: '',
  // database: 'project_se',
  host: "localhost",
  user: "root",
  password: "",
  database: "tarangsorn",

  // host: 'localhost',
  // user: 'root',
  // password: '12345678',
  // database: 'project_se',
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL database =", err);
    return;
  }
  console.log("MySQL successfully");
});

app.post("/create", (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;

  db.query(
    "INSERT INTO usersaj (email,name ) VALUES (?,?)",
    [email, fullName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/upload", (req, res) => {
  const excelData = req.body.excelData;

  const values = excelData.map(() => "( ?)").join(", ");

  const sql = `INSERT INTO usersaj (email, name) VALUES ${values}`;

  db.query(sql, excelData, (err, result) => {
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

  db.query(
    "INSERT INTO usersed (email,name ) VALUES (?,?)",
    [email, fullName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/uploads", (req, res) => {
  const excelData = req.body.excelData;

  const values = excelData.map(() => "( ?)").join(", ");

  const sql = `INSERT INTO usersed (email, name) VALUES ${values}`;

  db.query(sql, excelData, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error inserting values");
    } else {
      res.send("Values Inserted");
    }
  });
});

app.get("/get", (req, res) => {
  db.query("SELECT*FROM usersaj ORDER BY name", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/get1", (req, res) => {
  db.query("SELECT*FROM usersed ORDER BY name", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/searchsubject", (req, res) => {
  const searchText = req.query.searchText || "";

  // ใช้ prepared statement เพื่อป้องกัน SQL injection
  const sql = "SELECT * FROM course WHERE name LIKE ?";

  db.query(sql, [`%${searchText}%`], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      // ตรวจสอบว่ามีข้อมูลหรือไม่
      if (result.length > 0) {
        // แปลงผลลัพธ์เป็น JSON
        res.json(result);
      } else {
        // ถ้าไม่มีข้อมูล
        res.json({ message: "No results found." });
      }
    }
  });
});

app.get("/api/rowCount", (req, res) => {
  const query = "SELECT COUNT(*) AS rowCount FROM usersaj";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Query error:", err);
      res.status(500).send("Internal Server Error");
    } else {
      const rowCount = result[0].rowCount;
      res.json({ rowCount });
    }
  });
});

app.get("/api/rowCount1", (req, res) => {
  const query = "SELECT COUNT(*) AS rowCount FROM usersed";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Query error:", err);
      res.status(500).send("Internal Server Error");
    } else {
      const rowCount = result[0].rowCount;
      res.json({ rowCount });
    }
  });
});

app.post("/addroom", (req, res) => {
  const excelData = req.body.excelData;
  // const selectedValue8=req.body.selectedValue8;
  // const selectedValue9=req.body.selectedValue9;

  const values = excelData.map(() => "( ?)").join(", ");

  const sql = `INSERT INTO room (building,room ,quantity) VALUES ${values}`;

  db.query(sql, excelData, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error inserting values");
    } else {
      res.send("Values Inserted");
    }
  });
});

app.get("/getsub", (req, res) => {
  db.query("SELECT * FROM course ORDER BY courseid", (err, result) => {
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

  console.log(selectedValue1);

  const modifiedExcelData = excelData.map((data) => {
    // data.push(selectedValue1);

    return [selectedValue1, ...data];
  });

  const values = modifiedExcelData.map(() => "(?,?,?,?,?)").join(", ");

  const sql = `INSERT INTO course (course_year,subject_id,subject_name,credit,category ) VALUES ${values}`;

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
  const selectedValue2 = req.body.selectedValue2;
  const selectedValue3 = req.body.selectedValue3;
  const selectedValue4 = req.body.selectedValue4;

  db.query(
    "INSERT INTO course (course_year,subject_id,subject_name,credit,category ) VALUES (?,?,?,?,?)",
    [selectedValue2, idSubject, subjectName, selectedValue4, selectedValue3],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send("An error occurred while inserting values into the database.");
      } else {
        console.log("Values Inserted");
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/box", (req, res) => {
  db.query("SELECT * FROM box", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result); // ส่งผลลัพธ์กลับไปยังผู้ใช้
    }
  });
});

app.post("/box1", (req, res) => {
  const { inputValue } = req.body;

  if (!inputValue) {
    return res.status(400).json({ error: "error" });
  }

  db.query(
    "INSERT INTO `box` (id,info) VALUES (null,?)",
    [inputValue],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ success: true, message: "Data saved successfully" });
        console.log("บันทึกสำเร็จ");
      }
    }
  );
});

app.get("/time", (req, res) => {
  db.query("SELECT * FROM time", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result); // ส่งผลลัพธ์กลับไปยังผู้ใช้
      console.log("อ่านข้อมูลสำเร็จ");
    }
  });
});

app.post("/time1", (req, res) => {
  const { dayS, timeS, dayF, timeF } = req.body;

  if (!dayS || !timeS || !dayF || !timeF) {
    return res.status(400).json({ error: "error" });
  }

  db.query(
    "INSERT INTO time (`id`, `dayS`, `timeS`, `dayF`, `timeF`) VALUES (NULL, ? , ? ,? , ?)",
    [dayS, timeS, dayF, timeF],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ success: true, message: "Data saved successfully" });
        console.log("บันทึกสำเร็จ");
      }
    }
  );
});

app.delete("/box1/:boxId", (req, res) => {
  const boxId = req.params.boxId;
  // ทำการลบข้อมูลในฐานข้อมูล MySQL ตามดัชนีที่รับมาจาก params
  // ส่งคำตอบกลับไปว่าลบข้อมูลสำเร็จหรือไม่

  if (!boxId) {
    return res.status(400).json({ error: "error" });
  }

  db.query("DELETE FROM `box` WHERE id=?", [boxId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ success: true, message: "Data saved successfully" });
      console.log("ลบสำเร็จ");
    }
  });
});

app.delete("/delete/:userEmail", (req, res) => {
  const userEmail = req.params.userEmail;
  db.query(
    "DELETE FROM usersaj WHERE email = ?",
    [userEmail],
    (err, result) => {
      if (err) {
        console.error("Error deleting data:", err);
        res.status(500).send("Error deleting data");
      } else {
        console.log("Deleted user with email:", userEmail);
        res.status(200).send("Data deleted successfully");
      }
    }
  );
});

app.delete("/delete1/:userEmail", (req, res) => {
  const userEmail = req.params.userEmail;
  db.query(
    "DELETE FROM usersed WHERE email = ?",
    [userEmail],
    (err, result) => {
      if (err) {
        console.error("Error deleting data:", err);
        res.status(500).send("Error deleting data");
      } else {
        console.log("Deleted user with email:", userEmail);
        res.status(200).send("Data deleted successfully");
      }
    }
  );
});

app.get("/room", (req, res) => {
  db.query("SELECT * FROM room", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result); // ส่งผลลัพธ์กลับไปยังผู้ใช้
      console.log("อ่านข้อมูลสำเร็จ");
    }
  });
});

app.get("/search-courses", (req, res) => {
  const { query, checkboxValue } = req.query;
  const yearValues = checkboxValue
    .split(",")
    .filter((year) => ["55", "60", "65"].includes(year));

  let queries = yearValues.map((year) => {
    const tableName = `course${year}s`;
    // Use DISTINCT to avoid duplicates
    return `(SELECT DISTINCT sbj_code, sbj_name, sbj_year, lec, lab FROM ${tableName} WHERE sbj_code LIKE ? OR sbj_name LIKE ?)`;
  });

  let combinedQuery = queries.join(" UNION "); // UNION already ensures distinct rows across combined results
  let queryParams = [];
  yearValues.forEach(() => {
    queryParams.push(`%${query}%`, `%${query}%`);
  });

  if (yearValues.length === 0) {
    return res.json([]);
  }

  db.query(combinedQuery, queryParams, (err, results) => {
    if (err) {
      console;
      error("Error searching courses:", err);
      return res.status(500).send("Error searching courses");
    }
    // Remove any potential duplicates that could occur across different tables
    // This is a safety net since UNION should already prevent this
    const uniqueResults = results.reduce((acc, current) => {
      const x = acc.find((item) => item.sbj_code === current.sbj_code);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    res.json(uniqueResults);
  });
});

app.post("/register", (req, res) => {
  const {
    sbj_code,
    sbj_name,
    section,
    lectureOrLab,
    branch,
    year,
    lec,
    lab,
    sbj_year,
  } = req.body;

  // Check for missing data
  const missingFields = [];
  if (!sbj_code) missingFields.push("sbj_code");
  if (!sbj_name) missingFields.push("sbj_name");
  if (!section) missingFields.push("section");
  if (!lectureOrLab) missingFields.push("lectureOrLab");
  if (!branch) missingFields.push("branch");
  if (!year) missingFields.push("year");
  if (!sbj_year) missingFields.push("year");
  if (!lec) missingFields.push("year");
  if (!lab) missingFields.push("year");

  if (missingFields.length > 0) {
    return res
      .status(400)
      .send(`Missing required fields: ${missingFields.join(", ")}`);
  }

  const query =
    "INSERT INTO registration_records (sbj_code, sbj_name, section, lectureOrLab, branch, year, lec, lab , sbj_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [
      sbj_code,
      sbj_name,
      section,
      lectureOrLab,
      branch,
      year,
      lec,
      lab,
      sbj_year,
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
app.get("/practical-courses", (req, res) => {
  const query =
    'SELECT * FROM registration_records WHERE lectureOrLab = "ภาคปฏิบัติ"';
  db.query(query, (err, results) => {
    if (err) {
      console.error("Failed to retrieve practical courses: ", err);
      return res.status(500).send("Error retrieving practical courses");
    }
    res.json(results);
  });
});

// GET endpoint for retrieving 'ภาคบรรยาย' data
app.get("/lecture-courses", (req, res) => {
  const query =
    'SELECT * FROM registration_records WHERE lectureOrLab = "ภาคบรรยาย"';
  db.query(query, (err, results) => {
    if (err) {
      console.error("Failed to retrieve lecture courses: ", err);
      return res.status(500).send("Error retrieving lecture courses");
    }
    res.json(results);
  });
});

// GET endpoint for retrieving all registration data
app.get("/registration-data", (req, res) => {
  const query = "SELECT * FROM registration_records";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Failed to retrieve registration data: ", err);
      return res.status(500).send("Error retrieving registration data");
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

app.get('/schedule', (req, res) => {
  // Construct SQL query to get the relevant data
  // The SQL query will depend on your database schema
  const query = `
      SELECT courses.id, courses.sbj_code, courses.sbj_name, courses.sbj_num, courses.lab_or_lec,
             schedules.sec, schedules.name, schedules.number, schedules.branch,
             schedules.day, schedules.time, schedules.room
      FROM courses
      JOIN schedules ON courses.id = schedules.course_id`;

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching schedule:', err);
          res.status(500).send('Error fetching schedule');
      } else {
          res.json(results);
      }
  });
});


app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
