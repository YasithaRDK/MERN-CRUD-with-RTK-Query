import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useAddStudentMutation,
  useGetStudentQuery,
  useGetStudentsQuery,
  useUpdateStudentMutation,
} from "../features/studentApi";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const AddEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const { name, email, contact } = formData;
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: student,
    isLoading: getStudentLoading,
    refetch: getStudentRefetch,
  } = useGetStudentQuery(id);

  const { refetch: getStudentsRefetch } = useGetStudentsQuery();

  const [addStudent] = useAddStudentMutation();

  const [updateStudent] = useUpdateStudentMutation();

  const addStudentFn = async (data) => {
    try {
      await addStudent(data).unwrap();
      navigate("/");
      getStudentsRefetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const updateStudentFn = async (id, data) => {
    try {
      await updateStudent({ id, data }).unwrap();
      navigate("/");
      getStudentsRefetch();
      getStudentRefetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        contact: student.contact,
      });
    }
  }, [student]);

  const onChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, contact };
    if (id) {
      updateStudentFn(student._id, data);
    } else {
      addStudentFn(data);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6} className="card p-5">
          <div className="d-flex justify-content-between">
            <h1>{id ? "Update" : "Add"} Student</h1>
            <Link to="/">
              <Button variant="success" className="mt-3">
                Go Back
              </Button>
            </Link>
          </div>

          {getStudentLoading ? (
            <Loader />
          ) : (
            <Form onSubmit={onSubmit}>
              <Form.Group className="my-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name || ""}
                  onChange={onChange}
                  placeholder="Enter Name"
                />
              </Form.Group>

              <Form.Group className="my-2" controlId="contact">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  value={contact || ""}
                  onChange={onChange}
                  placeholder="Enter Contact Number"
                />
              </Form.Group>

              <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={email || ""}
                  onChange={onChange}
                  placeholder="Enter Email"
                />
              </Form.Group>

              <Button
                type="submit"
                variant={id ? "warning" : "primary"}
                className="mt-3"
              >
                {id ? "Update" : "Add"}
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AddEdit;
