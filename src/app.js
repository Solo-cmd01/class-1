const students = require('./models/students')
const classes = require('./models/students')
const helmet = require('helmet')
const cors = require('cors')
const express = require('express')

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", function(req, res) {
    res.send("Hello from app.js!");
});


// Get all students

app.get('/students', (req, res) => {
    res.json(students);
});

// Get a single student by ID

app.get('/students/:id', (req, res) => {
    const student = students.find((s) => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
});

// Add a new student

app.post('/students', (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age,
        classid: req.body.classid
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

// Update a student by ID

app.put('/students/:id', (req, res) => {
    const student = students.find((s) => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.name = req.body.name;
    student.age = req.body.age;
    student.classid = req.body.classid;

    res.json(student);
});

// Delete a student by ID

app.delete('/students/:id', (req, res) => {
    const index = students.findIndex((s) => s.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Student not found' });

    students.splice(index, 1);
    res.json({ message: 'Student deleted' });
});

// Get all classes

app.get('/classes', (req, res) => {
    res.json(classes);
});

// Get a single class by ID

app.get('/classes/:id', (req, res) => {
    const classroom = classes.find((c) => c.id === parseInt(req.params.id));
    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });
    res.json(classroom);
});

// Add a new classroom

app.post('/classes', (req, res) => {
    const newClassroom = {
        id: classes.length + 1,
        name: req.body.name,
        teacher: req.body.teacher,
        students: req.body.students
    };

    classes.push(newClassroom);
    res.status(201).json(newClassroom);
});

// Update a classroom by ID

app.put('/classes/:id', (req, res) => {
    const classroom = classes.find((c) => c.id === parseInt(req.params.id));
    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });

    classroom.name = req.body.name;
    classroom.teacher = req.body.teacher;
    classroom.students = req.body.students;

    res.json(classroom);
});

// Delete a classroom by ID

app.delete('/classes/:id', (req, res) => {
    const index = classes.findIndex((c) => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Classroom not found' });

    classes.splice(index, 1);
    res.json({ message: 'Classroom deleted' });
});






module.exports = app;