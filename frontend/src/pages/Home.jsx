import { Button, Card, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  useGetStudentsQuery,
  useDeleteStudentMutation,
} from "../features/studentApi";

const Home = () => {
  const { data: students, refetch } = useGetStudentsQuery();
  const [deleteStudent] = useDeleteStudentMutation();

  const onDeleteStudent = async (id) => {
    await deleteStudent(id);
    refetch();
  };

  return (
    <Container>
      <Card className="mt-5 p-2 p-md-3">
        <h1>Student Details</h1>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.contact}</td>
                  <td>{student.email}</td>
                  <td>
                    <Link to={`edit/${student._id}`}>
                      <Button variant="warning" className="me-2">
                        Edit
                      </Button>
                    </Link>
                    <Link to={`/view/${student._id}`}>
                      <Button variant="info" className="me-2 mt-2 mt-md-0">
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="mt-2 mt-md-0"
                      onClick={() => onDeleteStudent(student._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default Home;
